import React, {useRef, useState} from 'react';
import styled from "styled-components";

import {Button, Container, SpacedBottomInput, Title} from "./CommontStyledComponents";

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
    openModal: boolean
}

const ModalWrapper = styled.div<ModalWrapperProps>`
  visibility: ${props => props.openModal ? '' : 'hidden'};
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

let nextProjectId: number = 4;

export interface Project {
    id: number;
    label: string;
}

const startProjects: Project[] = [
    {id: 1, label: 'Thailand'},
    {id: 2, label: 'Wix'},
    {id: 3, label: 'Facebook'},
    {id: 4, label: 'Apple'}
];

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(startProjects);
    const [projectLabel, setProjectLabel] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [preEditedProject, setPreEditedProject] = useState<Project | null>(null);
    const [savingProject, setSavingProject] = useState<boolean>(false);
    const inputEl = useRef<HTMLInputElement>(null);


    const handleSaveProjectClicked = () => {
        if (!projectLabel) {
            return
        }

        setSavingProject(true);
        if (editMode) {
            const index: number = projects.findIndex(item => item.id === preEditedProject!.id);
            setProjects([
                ...projects.slice(0, index),
                {id: projects[index].id, label: projectLabel},
                ...projects.slice(index + 1)
            ]);

            setEditMode(false);
            setPreEditedProject(null);

        } else {
            const newProject: Project = {
              id: ++nextProjectId,
              label: projectLabel
            };
            setProjects([...projects, newProject]);
        }


        //This 'setTimeout' required only to show that loader works. (Mock functionality)
        setTimeout(() => {
            setProjectLabel('');
            setSavingProject(false);
            setOpenModal(false);
        }, 1000);
    };

    const handleDeleteProject = (projectId: number) => {
        const newProjects: Project[] = projects.filter(item => item.id !== projectId);
        setProjects(newProjects);
    };

    const handleEditProject = (project: Project) => {
        setProjectLabel(projectLabel);
        setPreEditedProject(project);
        setEditMode(true);
        handleOpenModal();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        requestAnimationFrame(() => {
            if (inputEl && inputEl.current) {
                inputEl.current.focus()
            }
        })
    };

    return (
        <>
            <Title>Projects</Title>
            <Wrapper>
                <ButtonWrapper>
                    <ProjectsButton onClick={e => handleOpenModal()}>Add project</ProjectsButton>
                </ButtonWrapper>
                <Container>
                    {
                        projects.length
                            ?
                            projects.map((project: Project) =>
                                <ProjectItem
                                    key={`${project.id}`}
                                    project={project}
                                    handleDeleteProject={handleDeleteProject}
                                    handleEditProject={handleEditProject}
                                />
                            )
                            :
                            <h3>Please add project</h3>
                    }
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
    )
};
export default Projects;