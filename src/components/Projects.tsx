import React from 'react';
import styled from "styled-components";
import ProjectItem from "./ProjectItem";
import Modal from "./Modal";
import {Button, Container, SpacedBottomInput, Title} from "./CommontStyledComponents";
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

const Projects: React.FC = () => {
    const [projects, setProjects] = React.useState<string[]>(['Thailand', 'Wix', 'Facebook', 'Apple']);
    const [projectLabel, setProjectLabel] = React.useState<string>('');
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [preEditedProject, setPreEditedProject] = React.useState<string>('');
    const [savingProject, setSavingProject] = React.useState<boolean>(false);
    const inputEl = React.useRef<HTMLInputElement>(null);


    const handleSaveProjectClicked = () => {
        if (!projectLabel) {
            return
        }

        setSavingProject(true);
        if (editMode) {
            const index: number = projects.indexOf(preEditedProject);
            setProjects([
                ...projects.slice(0, index),
                projectLabel,
                ...projects.slice(index + 1)
            ]);

            setEditMode(false);
            setPreEditedProject('');

        } else {
            setProjects([...projects, projectLabel]);
        }


        //This 'setTimeout' required only to show that loader works. (Mock functionality)
        setTimeout(() => {
            setProjectLabel('');
            setSavingProject(false);
            setOpenModal(false);
        }, 1000);
    };

    const handleDeleteProject = (projectLabel: string) => {
        const newProjects: string[] = projects.filter(item => item !== projectLabel);
        setProjects(newProjects);
    };

    const handleEditProject = (projectLabel: string) => {
        setProjectLabel(projectLabel);
        setPreEditedProject(projectLabel);
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
                            projects.map((project, index) =>
                                <ProjectItem
                                    key={`${index}${project}`}
                                    title={project}
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