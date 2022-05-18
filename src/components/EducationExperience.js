import React from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { Check, Close, Edit, Add, RestartAlt } from '@mui/icons-material';

function EducationExperience(props) {
  function sectionData(index) {
    const data = props.sectionData
    const schoolName = data[`school-name-${index}`];
    const titleOfStudy = data[`title-of-study-${index}`];
    const dateOfStudy = data[`date-of-study-${index}`];

    return { schoolName, titleOfStudy, dateOfStudy };
  }

  function formatData(index) {
    const { schoolName, titleOfStudy, dateOfStudy } = sectionData(index);
    const elements = [];
    if (schoolName) {
      elements.push(
        <Typography variant="body1" id={`school-name-${index}`}>{schoolName}</Typography>
      );
    }
    if (titleOfStudy) {
      elements.push(
        <Typography variant="body1">-</Typography>,
        <Typography fontStyle='italic' variant="body1" id={`title-of-study-${index}`}>
          {titleOfStudy}
        </Typography>
      );
    }
    if (dateOfStudy) {
      elements.push(
        <Typography variant="body1">( {dateOfStudy} )</Typography>
      );      
    }

    return elements;
  }

  function removeSectionBtn(index, contained=true) {
    const { removeSubSection } = props;
    
    return (
      <Button
        variant={contained ? "contained" : ''}
        endIcon={<Close />}
        color='secondary'
        size='small'
        onClick={(e) => { removeSubSection('education', index) }}
      >
        Remove section
      </Button>
    );
  }

  function info (index) {
    const { editSection } = props;
    const infoString = formatData(index);

    return (
      <div key={`education-section-${index}`}>
        <Stack direction="row" spacing={1}>
          {infoString}
        </Stack>

        <Button
          variant="contained"
          endIcon={<Edit />}
          color='secondary'
          size='small'
          onClick={(e) => { editSection('education', index) }}
        >
          Edit section
        </Button>

        {removeSectionBtn(index, true)}

        <hr className="subsection-divider" />
      </div>
    );
  }

  function form(index) {
    const { handleChange, handleSubmit } = props;
    const { schoolName, titleOfStudy, dateOfStudy } = sectionData(index);
    const sectionRemoveable = index !== 0;

    return (
      <form
        onSubmit={ (e) => { handleSubmit(e, 'education', index) } }
        key={`education-section-${index}`}
        className="EducationExperience"
      >
        <TextField
          required
          id={`school-name-${index}`}
          label="School name"
          variant="outlined"
          name={`school-name-${index}`}
          onChange={handleChange}
          value={schoolName ? schoolName: ''}
        />
        
        <Stack direction="row">
        <TextField
          id={`title-of-study-${index}`}
          label="Title of study"
          variant="outlined"
          name={`title-of-study-${index}`}
          onChange={handleChange}
          value={titleOfStudy ? titleOfStudy : ''}
        />
        
        <TextField
          id={`date-of-study-${index}`}
          label="Date of study"
          variant="outlined"
          name={`date-of-study-${index}`}
          onChange={handleChange}
          value={dateOfStudy ? dateOfStudy : ''}
        />
        </Stack>

        <Button type="submit" variant="contained" endIcon={<Check />}>
          Submit section
        </Button>

        {sectionRemoveable ? removeSectionBtn(index, false) : null}
      </form>
    );
  };

  const { sectionSet, addSubSection, resetSection } = props;
  const inputNames = ['school-name', 'title-of-study', 'date-of-study'];

  return (
    <section className="education-section">
    <Typography variant="h5">Education</Typography>
      { sectionSet.map((_, index) => {
          return sectionSet[index] ? info(index) : form(index);
        })
      }
      <Button
        variant="contained"
        endIcon={<Add />}
        onClick={(e) => { addSubSection('education') } }
      >
        Add education
      </Button>
      <Button
        onClick={ (e) => { resetSection('education', inputNames) } }
        variant="contained"
        endIcon={<RestartAlt />}
      >
        Reset section
      </Button>
    </section>
  );
}

export default EducationExperience;