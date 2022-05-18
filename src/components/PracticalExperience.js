import React, { useState } from 'react';
import {
  Button, IconButton, Paper, Stack, Typography, TextField
} from '@mui/material';
import { Add, Circle, Check, Close, Edit, RestartAlt } from '@mui/icons-material';

function PracticalExperience(props) {
  const [descriptions, setDescriptions] = useState([[]])

  function addDescription(description, index) {
    if (description.length <= 0) return;
    const newDescriptions = descriptions.slice();
    if (!newDescriptions[index]) {
      newDescriptions[index] = [];
    }
    newDescriptions[index].push(description);
    setDescriptions(newDescriptions);
    props.resetDescription(description, index, descriptions[index].length);
  };

  function removeDescription(index, descIndex) {
    const indexedDescriptions = descriptions[index];
    const updatedDesc = indexedDescriptions.slice(0, descIndex).concat(indexedDescriptions.slice(descIndex + 1));
    const newDescriptions = descriptions.slice()
    newDescriptions[index] = updatedDesc;
    setDescriptions(newDescriptions);
  };

  function currentDescriptions(index, status) {
    const submitted = descriptions[index]?.map((desc, descIndex) => {
      return (
        <Stack sx={{ alignItems: 'center' }} direction="row">
          <Circle sx={{ fontSize: 'small', color: 'blanchedalmond' }} />
        <Paper
          sx={{
            m: '4px 8px',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="body1"
            key={`desc-${index}:${descIndex}`}
            sx={{ m: '8px 6px' }}
          >
            {desc}
          </Typography>
        </Paper>
        </Stack>
      );
    });
    const inProgress = descriptions[index]?.map((desc, descIndex) => {
      return (
        <Paper
          sx={{ m: '4px 8px', display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            variant="body1"
            key={`desc-${index}:${descIndex}`}
            sx={{ m: '8px 6px' }}
          >
            {desc}
          </Typography>
          <div>        
            <IconButton
              onClick={() => removeDescription(index, descIndex)}
            >
              <Close />
            </IconButton>
          </div>
        </Paper>
      );
    });
    
    return status ? inProgress : submitted;
  };

  function sectionData(index) {
    const data = props.sectionData;
    const companyName = data[`company-name-${index}`];
    const positionTitle = data[`position-title-${index}`];
    const startDate = data[`start-date-${index}`];
    const endDate = data[`end-date-${index}`];
    const description = data[`description-${index}`];

    return { companyName, positionTitle, startDate, endDate, description }
  }

  function formatData(index) {
    const { companyName, positionTitle, startDate, endDate } = sectionData(index);
    const elements = []
    if (companyName) {
      elements.push(
        <Typography variant="body1" id={`company-name-${index}`}>{companyName}</Typography>
      );
    }
    if (positionTitle) {
      elements.push(
      <Typography variant="body1">-</Typography>,
      <Typography lineHeight={1.3} fontStyle='italic' variant="body1" id={`position-title-${index}`}>
        {positionTitle}
      </Typography>
      );
    }
    if (startDate) {
      const endDateText = endDate ? endDate : 'present';
      elements.push(
        <Typography variant="body1">( {startDate} - {endDateText} )</Typography>
      );
    } else {
      if (endDate) {
        elements.push(
          <Typography variant="body1">( unknown - {endDate} )</Typography>
        );
      }
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
        onClick={(e) => { removeSubSection('practical', index) }}
      >
        Remove section
      </Button>
    );
  }

  function info(index) {
    const { editSection } = props;
    const infoString = formatData(index);

    return (
      <div key={`practical-section-${index}`}>
        <Stack direction="row" spacing={1}>
          {infoString}
        </Stack>
        {currentDescriptions(index, false)}
        <Button
          variant="contained"
          endIcon={<Edit />}
          color='secondary'
          size='small'
          onClick={(e) => { editSection('practical', index) }}
        >
          Edit section
        </Button>
        {removeSectionBtn(index)}
        <hr className="subsection-divider" />
      </div>
    );
  }

  function form(index) {
    const { handleChange, handleSubmit } = props;
    const { companyName, positionTitle, startDate, endDate, description } = sectionData(index);
    const sectionRemoveable = index !== 0;

    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault()
          const newDescriptions = descriptions.slice()
          newDescriptions.push([]);
          setDescriptions(newDescriptions);
          handleSubmit(e, 'practical', index)
        } }
        key={`practical-section-${index}`}
        className="PracticalExperience"
      >
        <Stack direction="row">
        <TextField
          required
          id={`company-name-${index}`}
          label="Company name"
          variant="outlined"
          name={`company-name-${index}`}
          onChange={handleChange}
          value={companyName ? companyName : ''}
        />
        
        <TextField
          id={`position-title-${index}`}
          label="Position title"
          variant="outlined"
          name={`position-title-${index}`}
          onChange={handleChange}
          value={positionTitle ? positionTitle : ''}
        />
        </Stack>

        <Stack direction="row">
        <TextField
          id={`start-date-${index}`}
          label="Start date"
          variant="outlined"
          name={`start-date-${index}`}
          onChange={handleChange}
          value={startDate ? startDate : ''}
        />
        
        <TextField
          id={`end-date-${index}`}
          label="End date"
          variant="outlined"
          name={`end-date-${index}`}
          onChange={handleChange}
          value={endDate ? endDate : ''}
        />
        </Stack>

        {currentDescriptions(index, true)}

        <Stack direction="row" sx={{ display: 'flex' }}>
        <TextField
          sx={{ flex: 1 }}
          id={`description-${index}`}
          label='Job description'
          multiline
          maxRows={4}
          variant="outlined"
          name={`description-${index}`}
          onChange={handleChange}
          value={description ? description : ''}
        />
        <div>
          <IconButton
            sx={{ bgcolor: 'primary' }}
            variant="contained"
            size='small'
            onClick={ () => { addDescription(description, index) } }
          >
            <Add/>
          </IconButton>
        </div>
        </Stack>
          

        <Button type="submit" variant="contained"  endIcon={<Check />}>
          Submit section
        </Button>

        {sectionRemoveable ? removeSectionBtn(index, false) : null}
      </form>
    );
  };
    
  const { sectionSet, addSubSection, resetSection } = props;
  const inputNames = ['company-name', 'position-title', 'start-date', 'end-date', 'description'];

  return (
    <section className="practical-section">
    <Typography variant="h5">Experience</Typography>
      { sectionSet.map((_, index) => {
          return sectionSet[index] ? info(index) : form(index)
        })
      }
      <Button
        variant="contained"
        endIcon={<Add />}
        onClick={(e) => {
          const newDescriptions = descriptions.slice()
          newDescriptions.push([]);
          setDescriptions(newDescriptions);
          addSubSection('practical')
        } }
      >
        Add experience
      </Button>
      <Button
        onClick={ (e) => { resetSection('practical', inputNames) } }
        variant="contained"
        endIcon={<RestartAlt />}
      >
        Reset section
      </Button>
    </section>
  );
}

export default PracticalExperience;