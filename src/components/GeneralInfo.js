import React from 'react';

class GeneralInfo extends React.Component {
  info() {
    const data = this.props.sectionData;
    const firstName = data['first-name'];
    const lastName = data['last-name'];
    const phone = data['phone'];
    const email = data['email'];
    const url = data['url'];
    const address = data['address']
    const { editSection } = this.props;

    return (
      <>
        <p id='first-name'>{firstName}</p>
        <p id='last-name'>{lastName}</p>
        <p id="phone">{phone}</p>
        <p id="email">{email}</p>
        <p id="url">{url}</p>
        <p id="address">{address}</p>

        <button onClick={(e) => { editSection(e, 'personal') }} >Edit section</button>
      </>
    );
  }

  form() {
    const { handleChange, handleSubmit } = this.props;

    return (
      <form onSubmit={ (e) => { handleSubmit(e, 'personal') }} className="GeneralInfo">
        <label htmlFor="first-name">First name</label>
        <input
          onChange={handleChange}
          name="first-name"
          type="text"
          id="first-name"
        />

        <label htmlFor="last-name">Last name</label>
        <input
          onChange={handleChange}
          name="last-name"
          type="text"
          id="last-name"
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={handleChange}
          name="phone"
          type="text"
          id="phone"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          id="email"
        />

        <label htmlFor="url">URL</label>
        <input
          onChange={handleChange}
          name="url"
          type="text"
          id="url"
        />

        <label htmlFor="address">Address</label>
        <input
          onChange={handleChange}
          name="address"
          type="text"
          id="address"
        />

        <button>Submit section</button>
      </form>
    );
  };

  render() {
    const { sectionSet } = this.props;

    return (
      <section>
        <h3>Personal Details</h3>
        { sectionSet ? this.info() : this.form() }
      </section>
    );
  }
}

export default GeneralInfo;