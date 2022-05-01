import React from 'react';

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
    const { editSection } = this.props;
    const { companyName, positionTitle, startDate, endDate } = this.sectionData(index);

    return (
      <div key={`practical-section-${index}`}>
        <p id={`company-name-${index}`}>{companyName}</p>
        <p id={`position-title-${index}`}>{positionTitle}</p>
        <p id={`start-date-${index}`}>{startDate}</p>
        <p id={`end-date-${index}`}>{endDate}</p>

        <button
          onClick={(e) => { editSection(e, 'practical', index) }}
        >
          Edit section
        </button>
      </div>
    );
  }

  form(index) {
    const { handleChange, handleSubmit } = this.props;
    const { companyName, positionTitle, startDate, endDate } = this.sectionData(index);

    return (
      <form
      onSubmit={ (e) => { handleSubmit(e, 'practical', index)} }
        key={`practical-section-${index}`}
        className="PracticalExperience"
      >
        <label htmlFor={`company-name-${index}`}>Company Name</label>
        <input
          onChange={handleChange}
          type="text"
          name={`company-name-${index}`}
          id={`company-name-${index}`}
          value={companyName ? companyName : ''}
        />

        <label htmlFor={`position-title-${index}`}>Position title</label>
        <input
          onChange={handleChange}
          type="text"
          name={`position-title-${index}`}
          id={`position-title-${index}`}
          value={positionTitle ? positionTitle : ''}
        />

        <label htmlFor={`start-date-${index}`}>Start date</label>
        <input
          onChange={handleChange}
          type="text"
          name={`start-date-${index}`}
          id={`start-date-${index}`}
          value={startDate ? startDate : ''}
        />

        <label htmlFor={`end-date-${index}`}>End date</label>
        <input
          onChange={handleChange}
          type="text"
          name={`end-date-${index}`}
          id={`end-date-${index}`}
          value={endDate ? endDate : ''}
        />

        <button type="submit" >Submit section</button>
      </form>
    );
  };

  render() {
    const { sectionSet, addSubSection } = this.props;

    return (
      <section className="practical-section">
        <h3>Experience</h3>
        { sectionSet.map((_, index) => {
            return sectionSet[index] ? this.info(index) : this.form(index)
          })
        }
        <button
          onClick={ (e) => { addSubSection(e, 'practical') } }
        >
          Add experience
        </button>
      </section>
    );
  }
}

export default PracticalExperience;