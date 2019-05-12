import React, {FC} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {Project} from './Projects';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 10px 0;
  padding: 15px;
 
  border-radius: ${prop => prop.theme.borderRadius};
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
    handleEditProject: (project: Project) => void;
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProjectItem: FC<ProjectItemProps> = ({project, handleDeleteProject, handleEditProject}: ProjectItemProps) => {
    const {id} = project;
    return (
        <Container>
            <StyledLink to={{pathname: `projects/${project.label}`}}>{project.label}</StyledLink>
            <div>
                <Label onClick={() => handleEditProject(project)}>Edit</Label>
                <span> | </span>
                <DangerousLabel onClick={() => handleDeleteProject(id)}>Delete</DangerousLabel>
            </div>
        </Container>
    )
};

export default ProjectItem;