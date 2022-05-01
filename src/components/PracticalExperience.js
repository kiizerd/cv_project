import React from 'react';
import { Button, Typography, TextField } from '@mui/material';
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

  info(index) {
    const { editSection, removeSubSection } = this.props;
    const { companyName, positionTitle, startDate, endDate } = this.sectionData(index);

    return (
      <div key={`practical-section-${index}`}>
        <Typography variant="body1" id={`company-name-${index}`}>
          {companyName}
        </Typography>
        <Typography variant="body1" id={`position-title-${index}`}>
          {positionTitle}
        </Typography>
        <Typography variant="body1" id={`start-date-${index}`}>
          {startDate}
        </Typography>
        <Typography variant="body1" id={`end-date-${index}`}>
          {endDate}
        </Typography>

        <Button
          variant="contained"
          endIcon={<Edit />}
          onClick={(e) => { editSection('practical', index) }}
        >
          Edit section
        </Button>

        <Button
          variant="contained"
          endIcon={<Close />}
          onClick={(e) => { removeSubSection('practical', index) }}
        >
          Remove section
        </Button>

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
        
        <TextField
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