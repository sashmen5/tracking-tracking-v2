import React, {FC, ReactElement, useRef, useState} from 'react';
import styled from 'styled-components';
import {TiThLarge, TiThMenu} from 'react-icons/ti';

import {Button, Container, SpacedBottomInput, Title} from './CommontStyledComponents';
import ProjectItem from './ProjectItem';
import Modal from './Modal';
import withLoader from '../HOCs/withLoader';

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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const ProjectsButton = styled(Button)`
  width: 100px;
`;

const Icons = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 30px;
  width: 70px;
  display: flex;
  justify-content: space-between;
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
  const [projects, setProjects] = useState<string[]>(['Thailand', 'Wix', 'Facebook', 'Apple']);
  const [projectLabel, setProjectLabel] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [preEditedProject, setPreEditedProject] = useState<string>('');
  const [savingProject, setSavingProject] = useState<boolean>(false);
  const [projectsViewType, setProjectsViewType] = useState<ViewType>('GRID');
  const inputEl = useRef<HTMLInputElement>(null);


  const handleSaveProjectClicked = () => {
    if (!projectLabel) {
      return
    }

    const index: number = projects.findIndex(project => project.toLowerCase() === projectLabel.toLowerCase());
    if (index !== -1) return;

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

  const renderProjectItems = (itemsDirection: string) => (
      projects.length
          ?
          projects.map((project, index) =>
              <ProjectItem
                  itemsDirection={itemsDirection}
                  key={`${index}${project}`}
                  title={project}
                  project={project}
                  handleDeleteProject={handleDeleteProject}
                  handleEditProject={handleEditProject}
              />
          )
          :
          <h3>Please add project</h3>
  );

  const listView = () => (
      <Container>
        {
          renderProjectItems('row')
        }
      </Container>
  );

  const gridView = () => (
      <GridContainer>
        {
          renderProjectItems('column')
        }
      </GridContainer>
  );

  const itemsView = projectsViewType === 'GRID' ? gridView : listView;

  return (
      <>
        <Title>Projects</Title>
        <Wrapper>
          <ButtonWrapper>
            <Icons>
              <TiThMenu onClick={() => setProjectsViewType('ROWS')}/>
              <TiThLarge onClick={() => setProjectsViewType('GRID')}/>
            </Icons>
            <ProjectsButton onClick={e => handleOpenModal()}>Add project</ProjectsButton>
          </ButtonWrapper>
          <ProjectItems>
            {
              itemsView
            }
          </ProjectItems>
        </Wrapper>

        <ModalWrapper openModal={openModal}>
          <Modal closeModal={() => setOpenModal(false)}>
            <LoadingModalContentWrapper isLoading={savingProject}>
              <Label>Add new project</Label>
              <span>Project label</span>
              <SpacedBottomInput
                  type='text'
                  name='projectLabel'
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

const ProjectItems: FC<{ children: () => ReactElement }> = (props) => props.children();
