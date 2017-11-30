import $ from 'jquery';
import { connect } from '../redux/store';
import actions from '../redux/actions';


class Forms {
    selectors = {
        $forms: '.js-form'
    }
    constructor(props) {
        this.props = props;
        this.init();
    }
    updateProps(nextProps) {
        this.props = nextProps;
    }
    init() {
        const self = this;
        const $forms = $(self.selectors.$forms);
        $forms.each((i, form) => {
            const $form = $(form);
            self.bindEvents($form);
        });
    }
    handlers = {
        form: {
            submit: ($form) => {
                const form = {
                    action: $form.data('action'),
                    data: {},
                    // validation: {}
                };
                // TODO: validate


                return (e) => {
                    e.preventDefault();


                    $form.find('input').each((i, input) => {
                        var $input = $(input);
                        form.data[$input.data('name')] = $input.val();
                    });


                    switch (form.action) {
                        case 'user.login':
                            return this.props.userLogin(form.data);
                        case 'user.logout':
                            return this.props.userLogout(form.data);
                        case 'user.create':
                            return this.props.userCreate(form.data);
                        default:
                            return null;
                    }
                }
            }
        }
    }
    bindEvents($form) {
        $form.on('submit', this.handlers.form.submit($form));
    }
}


export default connect(
    store => ({
        breakpoint: store.state.breakpoint
    }),
    ({
        userLogin: actions.user.login,
        userLogout: actions.user.logout,
        userCreate: actions.user.create
    })
)(Forms);
