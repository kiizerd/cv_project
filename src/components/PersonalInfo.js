import React from 'react';

class GeneralInfo extends React.Component {
  sectionData() {
    const data = this.props.sectionData;
    const firstName = data['first-name'];
    const lastName = data['last-name'];
    const phone = data['phone'];
    const email = data['email'];
    const url = data['url'];
    const address = data['address']

    return { firstName, lastName, phone, email, url, address };
  }

  info() {
    const { editSection } = this.props;
    const { firstName, lastName, phone, email, url, address} = this.sectionData();

    return (
      <>
        <p id='first-name'>{firstName}</p>
        <p id='last-name'>{lastName}</p>
        <p id="phone">{phone}</p>
        <p id="email">{email}</p>
        <p id="url">{url}</p>
        <p id="address">{address}</p>

        <button onClick={(e) => { editSection('personal') }} >Edit section</button>
      </>
    );
  }

  form() {
    const { handleChange, handleSubmit } = this.props;
    const { firstName, lastName, phone, email, url, address} = this.sectionData();

    return (
      <form onSubmit={ (e) => { handleSubmit(e, 'personal') }} className="GeneralInfo">
        <label htmlFor="first-name">First name</label>
        <input
          onChange={handleChange}
          name="first-name"
          type="text"
          id="first-name"
          value={firstName ? firstName : ''}
        />

        <label htmlFor="last-name">Last name</label>
        <input
          onChange={handleChange}
          name="last-name"
          type="text"
          id="last-name"
          value={lastName ? lastName : ''}
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={handleChange}
          name="phone"
          type="text"
          id="phone"
          value={phone ? phone : ''}
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          id="email"
          value={email ? email : email}
        />

        <label htmlFor="url">URL</label>
        <input
          onChange={handleChange}
          name="url"
          type="text"
          id="url"
          value={url ? url : ''}
        />

        <label htmlFor="address">Address</label>
        <input
          onChange={handleChange}
          name="address"
          type="text"
          id="address"
          value={address ? address : ''}
        />

        <button>Submit section</button>
      </form>
    );
  };

  render() {
    const { sectionSet, resetSection } = this.props;
    const inputNames = ['first-name', 'last-name', 'email', 'phone', 'url', 'address'];

    return (
      <section>
        <h3>Personal Details</h3>
        { sectionSet ? this.info() : this.form() }
        <button onClick={ (e) => { resetSection('personal', inputNames) } }>Reset section</button>
      </section>
    );
  }
}

export default GeneralInfo;
