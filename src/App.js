import GeneralInfo from './components/GeneralInfo';
import EducationExperience from './components/EducationExperience';
import PracticalExperience from './components/PracticalExperience';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      sections: {
        personal: false,
        education: [false],
        practical: [false],
      },
    };

    this.addSubSection = this.addSubSection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitSection = this.handleSubmitSection.bind(this);
    this.handleEditSection = this.handleEditSection.bind(this);
  };

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    const data = Object.assign(this.state.data, { [name]: value })
    this.setState({ data });
  };

  handleSubmitSection(event, sectionKey, index) {
    event.preventDefault();
    const { sections } = this.state;
    let updatedSections = null;
    if (sectionKey === 'personal') {
      updatedSections = Object.assign(sections, { [sectionKey]: true });
    } else {
      const oldSections = sections[sectionKey].slice();
      oldSections[index] = true;
      updatedSections = Object.assign(sections, { [sectionKey]: oldSections });
    }
    this.setState({ updatedSections });
  }

  handleEditSection(event, sectionKey, index) {
    const { sections } = this.state;
    let updatedSections = null;
    if (sectionKey === 'personal') {
      updatedSections = Object.assign(sections, { [sectionKey]: false });
    } else {
      const oldSections = sections[sectionKey].slice();
      oldSections[index] = false;
      updatedSections = Object.assign(sections, { [sectionKey]: oldSections });
    }
    this.setState({ updatedSections });
  }
  
  addSubSection(e, sectionKey) {
    const { sections } = this.state;
    const section = [...sections[sectionKey], false];
    this.setState({
      sections: Object.assign(sections, { [sectionKey]: section })
    });
  };

  render() {
    const { sections, data } = this.state;
    return (
      <main>
        <GeneralInfo
          sectionSet={sections.personal}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmitSection}
          editSection={this.handleEditSection}
          sectionData={data}
        />
        <hr />
        <EducationExperience
          sectionSet={sections.education}
          addSubSection={this.addSubSection}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmitSection}
          editSection={this.handleEditSection}
          sectionData={data}
        />
        <hr />
        <PracticalExperience
          sectionSet={sections.practical}
          addSubSection={this.addSubSection}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmitSection}
          editSection={this.handleEditSection}
          sectionData={data}
        />
      </main>
    );
  }
};

export default App;
