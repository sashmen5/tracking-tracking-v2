import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

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
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const Label = styled.span`
  text-transform: uppercase;
`;

const DangerousLabel = styled(Label)`
  color: red;
`;

interface ProjectItemProps {
    title: string;
    handleDeleteProject: (title: string) => void;
    handleEditProject: (title: string) => void;
    project: string;
    itemsDirection: string;
}

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProjectItem: React.FC<ProjectItemProps> = ({title, project, handleDeleteProject, handleEditProject, itemsDirection}: ProjectItemProps) => {
    return (
        <Container flexDirection={itemsDirection}>
            <StyledLink to={{pathname: `Projects/${project}`}}>{title}</StyledLink>
            <div>
                <Label onClick={() => handleEditProject(title)}>Edit</Label>
                <span> | </span>
                <DangerousLabel onClick={() => handleDeleteProject(title)}>Delete</DangerousLabel>
            </div>
        </Container>
    )
};

export default ProjectItem;