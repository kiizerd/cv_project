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
    this.removeSubSection = this.removeSubSection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitSection = this.handleSubmitSection.bind(this);
    this.handleEditSection = this.handleEditSection.bind(this);
    this.handleSectionReset = this.handleSectionReset.bind(this);
    this.handleFullReset = this.handleFullReset.bind(this);
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

  handleEditSection(sectionKey, index) {
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
  
  addSubSection(sectionKey) {
    const { sections } = this.state;
    const section = [...sections[sectionKey], false];
    this.setState({
      sections: Object.assign(sections, { [sectionKey]: section })
    });
  };

  removeSubSection(sectionKey, index) {
    const { sections } = this.state;
    const section = sections[sectionKey].slice();
    const updatedSection = section.slice(0, index).concat(section.slice(index + 1))
    if (updatedSection.length <= 0) {
      this.setState({
        sections: Object.assign(sections, { [sectionKey]: [false] })
      });
    } else {
      this.setState({
        sections: Object.assign(sections, { [sectionKey]: updatedSection })
      });
    }
  };

  handleFullReset() {
    const confirmation = window.confirm('This will reset every section and erase ALL progress. Confirm?')
    if (!confirmation) return;
    this.setState({
      data: {},
      sections: {
        personal: false,
        education: [false],
        practical: [false],
      },
    });
  }

  handleSectionReset(sectionKey, inputNames) {
    const confirmation = window.confirm(`This will reset all data in the ${sectionKey} section. Confirm?`)
    if (!confirmation) return;
    const updatedData = {};
    const updatedSections = {};
    if (sectionKey === 'personal') {      
      updatedSections[sectionKey] = false;
      // Set data[name] to undefined instead of empty string.
      // empty string was causing a react error
      inputNames.forEach(name => updatedData[name] = undefined);
    } else {
      updatedSections[sectionKey] = [false];
      // Using a map instead of for each
      // For some reason inputNames.forEach is undefined??
      inputNames.map((name) => {
        const count = this.state.sections[sectionKey].length;
        [...Array(count)].forEach((_, subIndex) => {
          updatedData[`${name}-${subIndex}`] = '';
        })
        return ''
      }).flat()
    }
    this.setState({
      section: Object.assign(this.state.sections, updatedSections),
      data: Object.assign(this.state.data, updatedData)
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
          resetSection={this.handleSectionReset}
          sectionData={data}
        />
        <hr />
        <EducationExperience
          sectionSet={sections.education}
          addSubSection={this.addSubSection}
          removeSubSection={this.removeSubSection}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmitSection}
          editSection={this.handleEditSection}
          resetSection={this.handleSectionReset}
          sectionData={data}
        />
        <hr />
        <PracticalExperience
          sectionSet={sections.practical}
          addSubSection={this.addSubSection}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmitSection}
          editSection={this.handleEditSection}
          resetSection={this.handleSectionReset}
          sectionData={data}
        />

        <button onClick={this.handleFullReset}>Reset all</button>
      </main>
    );
  }
};

export default App;
