import React from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { Check, Close, Edit, Add, RestartAlt } from '@mui/icons-material';

class PracticalExperience extends React.Component {
  sectionData(index) {
    const data = this.props.sectionData;
    const companyName = data[`company-name-${index}`];
    const positionTitle = data[`position-title-${index}`];
    const startDate = data[`start-date-${index}`];
    const endDate = data[`end-date-${index}`];

    return { companyName, positionTitle, startDate, endDate }
  }

  formatData(index) {
    const { companyName, positionTitle, startDate, endDate } = this.sectionData(index);
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

  info(index) {
    const { editSection } = this.props;
    const infoString = this.formatData(index);

    return (
      <div key={`practical-section-${index}`}>
        <Stack direction="row" spacing={1}>
          {infoString}
        </Stack>
        <Button
          variant="contained"
          endIcon={<Edit />}
          color='secondary'
          size='small'
          onClick={(e) => { editSection('practical', index) }}
        >
          Edit section
        </Button>
        {this.removeSectionBtn(index)}
        <hr className="subsection-divider" />
      </div>
    );
  }

  removeSectionBtn(index, contained=true) {
    const { removeSubSection } = this.props;
    
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

  form(index) {
    const { handleChange, handleSubmit } = this.props;
    const { companyName, positionTitle, startDate, endDate } = this.sectionData(index);
    const sectionRemoveable = index !== 0;

    return (
      <form
      onSubmit={ (e) => { handleSubmit(e, 'practical', index)} }
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

        <Button type="submit" variant="contained"  endIcon={<Check />}>
          Submit section
        </Button>

        {sectionRemoveable ? this.removeSectionBtn(index, false) : null}
      </form>
    );
  };

  render() {
    const { sectionSet, addSubSection, resetSection } = this.props;
    const inputNames = ['company-name', 'position-title', 'start-date', 'end-date'];

    return (
      <section className="practical-section">
      <Typography variant="h5">Experience</Typography>
        { sectionSet.map((_, index) => {
            return sectionSet[index] ? this.info(index) : this.form(index)
          })
        }
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={(e) => { addSubSection('practical') } }
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
}

export default PracticalExperience;