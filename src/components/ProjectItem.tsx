import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PROJECT } from '../constants';
import { Project } from '../models';

interface ContainerProps {
  flexDirection: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 10px 0;
  padding: 15px;

  border-radius: ${prop => prop.theme.borderRadius};
  flex-direction: ${prop => prop.flexDirection};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Label = styled.span`
  text-transform: uppercase;
`;

const DangerousLabel = styled(Label)`
  color: red;
`;

interface ProjectItemProps {
  project: Project;
  handleDeleteProject: (id: number) => void;
  handleEditProject: (id: number) => void;
  itemsDirection: string;
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProjectItem: FC<ProjectItemProps> = ({
  project,
  handleDeleteProject,
  handleEditProject,
  itemsDirection
}: ProjectItemProps) => {
  const { id } = project;
  return (
    <Container flexDirection={itemsDirection}>
      <StyledLink to={{ pathname: `${PROJECT}/${project.id}` }}>
        {project.label}
      </StyledLink>
      <div>
        <Label onClick={() => handleEditProject(id)}>Edit</Label>
        <span> | </span>
        <DangerousLabel onClick={() => handleDeleteProject(id)}>
          Delete
        </DangerousLabel>
      </div>
    </Container>
  );
};

export default ProjectItem;
