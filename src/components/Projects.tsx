import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import { useSelector, useDispatch } from "react-redux";

import { Keyed, Project } from "models";

import { AppState } from "../store/reducers";
import { addProject, deleteProject, editProject } from "../store/actions";

import {
  Button,
  Container,
  SpacedBottomInput,
  Title
} from "./CommontStyledComponents";

import Modal from "./Modal";
import ProjectItem from "./ProjectItem";
import withLoader from "../HOCs/withLoader";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  border-radius: ${prop => prop.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundContainer};
`;

interface ModalWrapperProps {
  openModal: boolean;
}

const ModalWrapper = styled.div<ModalWrapperProps>`
  visibility: ${props => (props.openModal ? "" : "hidden")};
`;

const Label = styled.div`
  margin-bottom: 25px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProjectsButton = styled(Button)`
  width: 100px;
  margin-bottom: 50px;
`;

const LoadingModalContentWrapper = withLoader(ModalContent);

const Projects: FC = () => {
  const reduxProjects: Keyed<Project> = useSelector(
    (state: AppState) => state.projects
  );
  const dispatch = useDispatch();

  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [projectLabel, setProjectLabel] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [savingProject, setSavingProject] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSaveProjectClicked = () => {
    if (!projectLabel) {
      return;
    }

    setSavingProject(true);
    if (editProjectId) {
      dispatch(editProject(editProjectId, projectLabel));
      setEditProjectId(null);
    } else {
      dispatch(addProject(projectLabel));
    }

    //This 'setTimeout' required only to show that loader works. (Mock functionality)
    setTimeout(() => {
      setProjectLabel("");
      setSavingProject(false);
      setOpenModal(false);
    }, 100);
  };

  const handleDeleteProject = (projectId: number) => {
    dispatch(deleteProject(projectId));
  };

  const handleEditProject = (id: number) => {
    const projectLabel: string = reduxProjects[id].label;
    setProjectLabel(projectLabel);
    setEditProjectId(id);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    requestAnimationFrame(() => {
      if (inputEl && inputEl.current) {
        inputEl.current.focus();
      }
    });
  };

  const projectKeys: string[] = Object.keys(reduxProjects);

  return (
    <>
      <Title>Projects</Title>
      <Wrapper>
        <ButtonWrapper>
          <ProjectsButton onClick={e => handleOpenModal()}>
            Add project
          </ProjectsButton>
        </ButtonWrapper>
        <Container>
          {projectKeys.length ? (
            projectKeys.map((key: string) => (
              <ProjectItem
                key={`${reduxProjects[key].id}`}
                project={reduxProjects[key]}
                handleDeleteProject={handleDeleteProject}
                handleEditProject={handleEditProject}
              />
            ))
          ) : (
            <h3>Please add project</h3>
          )}
        </Container>
      </Wrapper>

      <ModalWrapper openModal={openModal}>
        <Modal closeModal={() => setOpenModal(false)}>
          <LoadingModalContentWrapper isLoading={savingProject}>
            <Label>Add new project</Label>
            <span>Project label</span>
            <SpacedBottomInput
              type="text"
              name="projectLabel"
              value={projectLabel}
              ref={inputEl}
              onChange={e => setProjectLabel(e.target.value)}
            />
            <Button onClick={handleSaveProjectClicked}>Save</Button>
          </LoadingModalContentWrapper>
        </Modal>
      </ModalWrapper>
    </>
  );
};
export default Projects;
