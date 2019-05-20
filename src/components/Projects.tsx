import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TiThLarge, TiThMenu } from 'react-icons/ti';
import { find, map, size } from 'lodash/fp';
// @ts-ignore
import { useSelector, useDispatch } from 'react-redux';

import { Keyed, Project } from 'models';

import { AppState } from 'store/reducers';
import {
  addProject,
  deleteProject,
  editProject,
  fetchProjects
} from 'store/actions';

import withLoader from 'hocs/withLoader';

import Error from 'components/Error';

import {
  Button,
  Container,
  ModalContent,
  Title
} from 'components/CommontStyledComponents';

import Modal from 'components/Modal';
import ProjectItem from 'components/ProjectItem';
import { loadingValueSelector, projectsSelector } from 'selectors/index';
import { ADD_PROJECT, EDIT_PROJECT, FETCH_PROJECTS } from 'store/actionTypes';
import ProjectForm, { ProjectFormValues } from 'components/ProjectForm';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const WrapperProjectsWithLoader = withLoader(Wrapper);

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
  const projects: Keyed<Project> = useSelector((state: AppState) =>
    projectsSelector(state)
  );

  const dispatch = useDispatch();
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [projectsViewType, setProjectsViewType] = useState<ViewType>('ROWS');
  const [formValues, setFormValues] = useState<ProjectFormValues>({
    label: '',
    maxMembers: 0,
    owner: ''
  });
  const addingProject = useSelector((state: AppState) =>
    loadingValueSelector(state, ADD_PROJECT)
  );
  const editingProject = useSelector((state: AppState) =>
    loadingValueSelector(state, EDIT_PROJECT)
  );
  const isFetching = useSelector((state: AppState) =>
    loadingValueSelector(state, FETCH_PROJECTS)
  );
  const isLoading = addingProject || editingProject;

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleSaveProject = (values: ProjectFormValues) => {
    const exists = find(
      (project: Project) =>
        project.label.toLowerCase() === values.label.toLowerCase(),
      projects
    );

    if (!values.label || exists) {
      return;
    }

    if (editProjectId) {
      dispatch(editProject(editProjectId, values));
      setEditProjectId(null);
    } else {
      dispatch(addProject(values));
    }
  };

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  const handleEditProject = (id: string) => {
    const project = projects[id];
    const { label, owner, maxMembers } = project;
    setEditProjectId(id);
    setFormValues({ label, owner, maxMembers });
    handleOpenModal();
  };

  const handleAddProjectFormOpen = () => {
    setFormValues({ label: '', owner: '', maxMembers: 0 });
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const renderProjectItems = (itemsDirection: string) =>
    size(projects)
      ? map((item: Project) => {
          return (
            <ProjectItem
              key={item.id}
              itemsDirection={itemsDirection}
              project={item}
              handleDeleteProject={handleDeleteProject}
              handleEditProject={handleEditProject}
            />
          );
        }, projects)
      : !isFetching && <h3>Please add project</h3>;

  const listView = () => <Container>{renderProjectItems('row')}</Container>;

  const gridView = () => (
    <GridContainer>{renderProjectItems('column')}</GridContainer>
  );

  const itemsView = projectsViewType === 'GRID' ? gridView : listView;

  return (
    <>
      <Title>Projects</Title>
      <WrapperProjectsWithLoader isLoading={isFetching}>
        <ButtonWrapper>
          <Icons>
            <TiThMenu onClick={() => setProjectsViewType('ROWS')} />
            <TiThLarge onClick={() => setProjectsViewType('GRID')} />
          </Icons>
          <ProjectsButton onClick={handleAddProjectFormOpen}>
            Add project
          </ProjectsButton>
        </ButtonWrapper>
        <ProjectItems>{itemsView}</ProjectItems>
      </WrapperProjectsWithLoader>

      {openModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <LoadingModalContentWrapper isLoading={isLoading}>
            <ProjectForm
              values={formValues}
              handleSaveProject={handleSaveProject}
            />
          </LoadingModalContentWrapper>
        </Modal>
      )}
      <Error />
    </>
  );
};
export default Projects;

const ProjectItems: FC<{ children: () => ReactElement }> = props =>
  props.children();
