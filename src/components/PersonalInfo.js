import React from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { Check, Edit, RestartAlt } from '@mui/icons-material';

function GeneralInfo(props) {
  const sectionData = () => {
    const data = props.sectionData;
    const firstName = data['first-name'];
    const lastName = data['last-name'];
    const phone = data['phone'];
    const email = data['email'];
    const url = data['url'];
    const address = data['address']

    return { firstName, lastName, phone, email, url, address };
  }

  const info = () => {
    const { editSection } = this.props;
    const { firstName, lastName, phone, email, url, address} = this.sectionData();

    return (
      <>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body1" id='first-name'>{firstName}</Typography>
          <Typography variant="body1" id='last-name'>{lastName}</Typography>
        </Stack>

        <Typography variant="body1" id="phone">{phone}</Typography>
        <Typography variant="body1" id="email">{email}</Typography>
        <Typography variant="body1" id="url">{url}</Typography>
        <Typography variant="body1" id="address">{address}</Typography>

        <Button
          variant="contained"
          endIcon={<Edit />}
          color='secondary'
          size='small'
          onClick={ (e) => { editSection('personal') } }
        >
          Edit section
        </Button>
        <br/>
      </>
    );
  }

  const form = () => {
    const { handleChange, handleSubmit } = props;
    const { firstName, lastName, phone, email, url, address} = sectionData();

    return (
      <form onSubmit={ (e) => { handleSubmit(e, 'personal') }} className="GeneralInfo">
        <Stack direction="row">
          <TextField
            required
            id="first-name"
            label="First name"
            variant="outlined"
            name="first-name"
            onChange={handleChange}
            value={firstName ? firstName : ''}
          />

          <TextField
            required
            id="last-name"
            label="Last name"
            variant="outlined"
            name="last-name"
            onChange={handleChange}
            value={lastName ? lastName : ''}
          />
        </Stack>

        <Stack direction="row">
        <TextField
          item
          xs={6}
          id="phone"
          label="Phone number"
          variant="outlined"
          name="phone"
          onChange={handleChange}
          value={phone ? phone : ''}
        />
        
        <TextField
          id="email"
          label="Email address"
          variant="outlined"
          name="email"
          onChange={handleChange}
          value={email ? email : email}
        />
        </Stack>
        
        <Stack direction="row">
        <TextField
          id="url"
          label="Website URL"
          variant="outlined"
          name="url"
          onChange={handleChange}
          value={url ? url : ''}
        />
        
        <TextField
          id="address"
          label="Physical address"
          variant="outlined"
          name="address"
          onChange={handleChange}
          value={address ? address : ''}
        />
        </Stack>

        <Button type="submit" variant="contained" endIcon={<Check />}>
          Submit section
        </Button>
      </form>
    );
  };

  const { sectionSet, resetSection } = props;
  const inputNames = ['first-name', 'last-name', 'email', 'phone', 'url', 'address'];

  return (
    <section>
      <Typography variant="h5">Personal Details</Typography>
      { sectionSet ? info() : form() }
      <Button
        onClick={ (e) => { resetSection('personal', inputNames) } }
        variant="contained"
        endIcon={<RestartAlt />}
      >
        Reset section
      </Button>
    </section>
  );
}

export default GeneralInfo;
