import React, { FC, ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { TiThLarge, TiThMenu } from 'react-icons/ti';
// @ts-ignore
import { useSelector, useDispatch } from 'react-redux';

import { Keyed, Project } from 'models';

import {
  Button,
  Container,
  SpacedBottomInput,
  Title
} from 'components/CommontStyledComponents';

import Modal from 'components/Modal';

import ProjectItem from 'components/ProjectItem';
import withLoader from 'hocs/withLoader';
import { addProject, deleteProject, editProject } from 'store/actions';
import { AppState } from 'store/reducers';

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
  visibility: ${props => (props.openModal ? '' : 'hidden')};
`;

const Label = styled.div`
  margin-bottom: 25px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ProjectsButton = styled(Button)`
  width: 100px;
`;

const Icons = styled.div`
  font-size: 30px;
  width: 70px;
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.secondary};
`;

const GridContainer = styled(Container)`
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(3, 180px);
  grid-auto-rows: 180px;
`;

type ViewType = 'ROWS' | 'GRID';

const LoadingModalContentWrapper = withLoader(ModalContent);

const Projects: FC = () => {
  const reduxProjects: Keyed<Project> = useSelector(
    (state: AppState) => state.projects
  );
  const dispatch = useDispatch();

  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [projectLabel, setProjectLabel] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [savingProject, setSavingProject] = useState<boolean>(false);
  const [projectsViewType, setProjectsViewType] = useState<ViewType>('ROWS');
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
      setProjectLabel('');
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

  const renderProjectItems = (itemsDirection: string) =>
    projectKeys.length ? (
      projectKeys.map((key: string) => (
        <ProjectItem
          key={`${reduxProjects[key].id}`}
          itemsDirection={itemsDirection}
          project={reduxProjects[key]}
          handleDeleteProject={handleDeleteProject}
          handleEditProject={handleEditProject}
        />
      ))
    ) : (
      <h3>Please add project</h3>
    );

  const listView = () => <Container>{renderProjectItems('row')}</Container>;

  const gridView = () => (
    <GridContainer>{renderProjectItems('column')}</GridContainer>
  );

  const itemsView = projectsViewType === 'GRID' ? gridView : listView;

  return (
    <>
      <Title>Projects</Title>
      <Wrapper>
        <ButtonWrapper>
          <Icons>
            <TiThMenu onClick={() => setProjectsViewType('ROWS')} />
            <TiThLarge onClick={() => setProjectsViewType('GRID')} />
          </Icons>
          <ProjectsButton onClick={e => handleOpenModal()}>
            Add project
          </ProjectsButton>
        </ButtonWrapper>
        <ProjectItems>{itemsView}</ProjectItems>
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

const ProjectItems: FC<{ children: () => ReactElement }> = props =>
  props.children();
