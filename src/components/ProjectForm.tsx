import React, { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { Button, SpacedBottomInput } from 'components/CommontStyledComponents';

export interface ProjectFormValues {
  owner: string;
  label: string;
  maxMembers: number;
}

interface ProjectFormProps {
  values: ProjectFormValues;
  handleSaveProject: (values: ProjectFormValues) => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  margin-bottom: 25px;
  font-size: 20px;
`;

const ProjectForm: FC<ProjectFormProps> = ({
  values,
  handleSaveProject
}: ProjectFormProps) => {
  return (
    <Formik
      initialValues={values}
      onSubmit={handleSaveProject}
      validationSchema={Yup.object().shape({
        label: Yup.string().required('Required'),
        owner: Yup.string().required('Required'),
        maxMembers: Yup.number().required('Required')
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <StyledForm onSubmit={handleSubmit}>
            <Label>Add new project</Label>
            <label htmlFor="label" style={{ display: 'block' }}>
              Project label
            </label>
            <SpacedBottomInput
              id="label"
              type="text"
              value={values.label}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.label && touched.label
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.label && touched.label && (
              <div className="input-feedback">{errors.label}</div>
            )}

            <label htmlFor="owner" style={{ display: 'block' }}>
              Owner name
            </label>
            <SpacedBottomInput
              id="owner"
              type="text"
              value={values.owner}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.owner && touched.owner
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.owner && touched.owner && (
              <div className="input-feedback">{errors.owner}</div>
            )}
            <label htmlFor="maxMembers" style={{ display: 'block' }}>
              Max number of members
            </label>
            <SpacedBottomInput
              id="maxMembers"
              type="text"
              value={values.maxMembers}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.maxMembers && touched.maxMembers
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.maxMembers && touched.maxMembers && (
              <div className="input-feedback">{errors.maxMembers}</div>
            )}

            <Button type="submit">Save</Button>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default ProjectForm;
