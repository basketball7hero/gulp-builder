import $ from 'jquery';
import 'jquery.cookie';
import store from './redux/store';
import actions from './redux/actions';
import Responsive from './components/Responsive';
import Forms from './components/Forms';


$(document).ready(() => {
    if (window.__USER__) store.dispatch(actions.user.sign());


    const responsive = Responsive();
    const forms = Forms();
});
