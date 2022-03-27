import './App.css';
import { useForm } from "react-hook-form";
import { Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import contactImg from './images/contact.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [business, setBusiness] = useState(false)
  const [social, setSocial] = useState(false)
  const [virtual, setVirtual] = useState(false);
  const [getMessage, setGetMessage] = useState([]);
  const onSubmit = data => {
    const getData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      message: data.message,
      business: business ? 'Business Services' : '',
      social: social ? 'Social Services' : '',
      virtual: virtual ? 'Virtual Event Services' : ''
    }
    axios.post('http://localhost:5000/message', getData)
      .then(res => {
        if (res.data.acknowledged) {
          alert('Message send Successfully!!!')
        }
      });
    console.log(getData);
  };
  useEffect(() => {
    axios('http://localhost:5000/messages')
      .then(res => setGetMessage(res.data));
  }, []);
  console.log(getMessage);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 mt-2">
          <div style={{ borderRadius: 10, padding: 10, backgroundColor: '#f2f2f2', boxShadow: '5px 5px 20px gray, -5px -5px 20px gray' }}>
            <div className="image-div">
              <img className="image-inner" src={contactImg} alt="" />
            </div>
            <p>Let’s see how I can help you.</p>
            <p>Phone: +1 (240) 617-3800
              Email: hello@between4thand5th.social</p>
            <p>FIND WITH ME</p>
            <div className="row">
              <div className="contactIcon col-4">
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className="contactIcon col-4">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div className="contactIcon col-4">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div style={{ borderRadius: 10, padding: 10, backgroundColor: '#f2f2f2', boxShadow: '5px 5px 20px gray, -5px -5px 20px gray' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="">First Name</label>
                  <input className="form-control" {...register("firstName", { required: true })} />
                  {errors.firstName && <span className="text-danger" >This field is required</span>}
                </div>
                <div className="col-6">
                  <label htmlFor="">Last Name</label>
                  <input className="form-control"  {...register("lastName", { required: true })} />
                  {errors.lastName && <span className="text-danger" >This field is required</span>}
                </div>
              </div>
              <br />
              <div>
                <label htmlFor="">Email</label>
                <input className="form-control" {...register("email", { required: true })} />
                {errors.email && <span className="text-danger" >This field is required</span>}
              </div>
              <br />
              <div>
                <label htmlFor="">Company Name</label>
                <input className="form-control" {...register("company", { required: true })} />
                {errors.company && <span className="text-danger" >This field is required</span>}
              </div>
              <br />
              <p>Services Intersted</p>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Select Services</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <input onChange={() => setBusiness(!business)} type="checkbox" /> <label htmlFor="">Business Services</label>
                    </div>
                    <div>
                      <input onChange={() => setSocial(!social)} type="checkbox" /> <label htmlFor="">Social Services</label>
                    </div>
                    <div>
                      <input onChange={() => setVirtual(!virtual)} type="checkbox" /> <label htmlFor="">Virtual Event Services</label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <br />
              <div>
                <label htmlFor="m">Your Message</label>
                <textarea className="form-control" style={{ height: 100 }} {...register("message", { required: true })} />
                {errors.message && <span className="text-danger" >This field is required</span>}
              </div>
              <br />
              <input className="form-control btn btn-outline-danger" type="submit" value='Send Message' />
            </form>
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        {
          getMessage?.map(message => <div style={{ borderRadius: 10, padding: 5, backgroundColor: '#f2f2f2' }} className="col-lg-4 col-sm-6" key={message._id}>
            <ul>
              <li>Full Name: {message?.firstName} {message?.lastName}</li>
              <li>Email: {message.email}</li>
              <li>Company: {message.company}</li>
              <li className="fw-bolder">Services</li>
              <div>
                <ul>
                  {message?.business && <li>{message?.business}</li>}
                  {message?.social && <li>{message?.social}</li>}
                  {message?.virtual && <li>{message?.virtual}</li>}
                </ul>
              </div>
              <li>Massage: {message.message}</li>
            </ul>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
