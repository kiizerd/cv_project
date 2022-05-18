import PersonalInfo from './components/PersonalInfo';
import EducationExperience from './components/EducationExperience';
import PracticalExperience from './components/PracticalExperience';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    h5: {
      margin: '10px 5px 3px',
      color: 'blanchedalmond'
    },
    body1: {
      color: 'blanchedalmond'
    },
    subtitle2: {
      color: 'blanchedalmond'
    },
    button: {
      color: 'blanchedalmond'
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '4px 6px'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '4px 4px'
        }
      }
    }
  }
});

function App() {
  const [data, setData] = useState({});
  const [sections, setSections] = useState(defaultSections());

  function handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    const newData = Object.assign(data, { [name]: value })
    setData(newData);
  };

  function handleSubmitSection(event, sectionKey, index) {
    event.preventDefault();
    let updatedSections = null;
    if (sectionKey === 'personal') {
      updatedSections = Object.assign(sections, { [sectionKey]: true });
    } else {
      const oldSections = sections[sectionKey].slice();
      oldSections[index] = true;
      updatedSections = Object.assign(sections, { [sectionKey]: oldSections });
    }
    setSections(updatedSections);
  }

  function handleEditSection(sectionKey, index) {
    let updatedSections = null;
    if (sectionKey === 'personal') {
      updatedSections = Object.assign(sections, { [sectionKey]: false });
    } else {
      const oldSections = sections[sectionKey].slice();
      oldSections[index] = false;
      updatedSections = Object.assign(sections, { [sectionKey]: oldSections });
    }
    setSections(updatedSections);
  }
  
  function addSubSection(sectionKey) {
    const section = [...sections[sectionKey], false];
    setSections(Object.assign(sections, { [sectionKey]: section }));
  };

  function removeSubSection(sectionKey, index) {
    const section = sections[sectionKey].slice();
    const updatedSection = section.slice(0, index).concat(section.slice(index + 1))
    if (updatedSection.length <= 0) {
      setSections(Object.assign(sections, { [sectionKey]: [false] }));
    } else {
      setSections(Object.assign(sections, { [sectionKey]: updatedSection }));
    }
  };

  function handleFullReset() {
    const confirmation = window.confirm('This will reset every section and erase ALL progress. Confirm?')
    if (!confirmation) return;
    setData({})
    setSections(defaultSections())
  }

  function defaultSections() {
    return {
      personal: false,
      education: [false],
      practical: [false],
    }
  }

  function handleSectionReset(sectionKey, inputNames) {
    // const confirmation = window.confirm(`This will reset all data in the ${sectionKey} section. Confirm?`)
    // if (!confirmation) return;
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
    setSections(Object.assign(this.state.sections, updatedSections))
    setData(Object.assign(this.state.data, updatedData))
  };

  function handleResetDescription(description, index, descIndex) {
    setData(Object.assign(data, {
      [`description-${index}`]: undefined,
      [`description-${index}-${descIndex}`]: description
    }))
  };

  return (
    <ThemeProvider theme={theme}>
      <PersonalInfo
        sectionSet={sections.personal}
        handleChange={handleInputChange}
        handleSubmit={handleSubmitSection}
        editSection={handleEditSection}
        resetSection={handleSectionReset}
        sectionData={data}
      />
      <hr />
      <EducationExperience
        sectionSet={sections.education}
        addSubSection={addSubSection}
        removeSubSection={removeSubSection}
        handleChange={handleInputChange}
        handleSubmit={handleSubmitSection}
        editSection={handleEditSection}
        resetSection={handleSectionReset}
        sectionData={data}
      />
      <hr />
      <PracticalExperience
        sectionSet={sections.practical}
        addSubSection={addSubSection}
        removeSubSection={removeSubSection}
        handleChange={handleInputChange}
        handleSubmit={handleSubmitSection}
        editSection={handleEditSection}
        resetSection={handleSectionReset}
        resetDescription={handleResetDescription}
        sectionData={data}
      />
      <hr/>
      <Button onClick={handleFullReset}>Reset all</Button>        
    </ThemeProvider>
  );
}
export default App;
