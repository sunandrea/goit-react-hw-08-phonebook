import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getContacts } from 'redux/selectors';
import { getIsLoggedIn } from 'auth/auth-selectors';
import { fetchContacts } from 'redux/operations';
import { useNavigate } from 'react-router-dom';
import ContactsForm from '../components/ContactsForm/ContactsForm';
import Filter from '../components/Filter/Filter';
import ContactsList from '../components/ContactsList/ContactsList';

const ContactPage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
    return;
  }, [dispatch, isLoggedIn, navigate]);

  const contacts = useSelector(getContacts);
  const filterValue = useSelector(state => state.filter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue)
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <ContactsForm />
      <Filter />
      <ContactsList contacts={filteredContacts} />
    </div>
  );
};

export default ContactPage;
