import React from 'react';

class EducationExperience extends React.Component {
  sectionData(index) {
    const data = this.props.sectionData;
    const schoolName = data[`school-name-${index}`];
    const titleOfStudy = data[`title-of-study-${index}`];
    const dateOfStudy = data[`date-of-study-${index}`];

    return { schoolName, titleOfStudy, dateOfStudy };
  }

  info = (index) => {
    const { editSection, removeSubSection } = this.props;
    const { schoolName, titleOfStudy, dateOfStudy } = this.sectionData(index);

    return (
      <div key={`education-section-${index}`}>
        <p id={`school-name-${index}`}>{schoolName}</p>
        <p id={`title-of-study-${index}`}>{titleOfStudy}</p>
        <p id={`date-of-study-${index}`}>{dateOfStudy}</p>

        <button
          onClick={(e) => { editSection('education', index) }}
        >
          Edit section
        </button>

        <button
          onClick={(e) => { removeSubSection('education', index) }}
        >
          Remove section
        </button>

        <hr className="subsection-divider" />
      </div>
    );
  }

  form(index) {
    const { handleChange, handleSubmit } = this.props;
    const { schoolName, titleOfStudy, dateOfStudy } = this.sectionData(index);

    return (
      <form
        onSubmit={ (e) => { handleSubmit(e, 'education', index) } }
        key={`education-section-${index}`}
        className="EducationExperience"
      >
        <label htmlFor={`school-name-${index}`}>School Name</label>
        <input
          onChange={handleChange}
          type="text"
          name={`school-name-${index}`}
          id={`school-name-${index}`}
          value={schoolName ? schoolName: ''}
        />

        <label htmlFor={`title-of-study-${index}`}>Title of study</label>
        <input
          onChange={handleChange}
          type="text"
          name={`title-of-study-${index}`}
          id={`title-of-study-${index}`}
          value={titleOfStudy ? titleOfStudy : ''}
        />

        <label htmlFor={`date-of-study-${index}`}>Date of study</label>
        <input
          onChange={handleChange}
          type="text"
          name={`date-of-study-${index}`}
          id={`date-of-study-${index}`}
          value={dateOfStudy ? dateOfStudy : ''}
        />

        <button type="submit">Submit section</button>
      </form>
    );
  };

  render() {
    const { sectionSet, addSubSection, resetSection } = this.props;
    const inputNames = ['school-name', 'title-of-study', 'date-of-study'];

    return (
      <section className="education-section">
        <h3>Education</h3>
        { sectionSet.map((_, index) => {
            return sectionSet[index] ? this.info(index) : this.form(index);
          })
        }
        <button
          onClick={(e) => { addSubSection('education') } }
        >
          Add education
        </button>

        <button
          onClick={ (e) => { resetSection('education', inputNames) } }
        >
          Reset section
        </button>
      </section>
    );
  }
}

export default EducationExperience;