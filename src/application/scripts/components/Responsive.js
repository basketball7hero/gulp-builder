import $ from 'jquery';
import actions from '../redux/actions';
import { connect } from '../redux/store';


class Responsive {
    selectors = {
        siteWrapper: '.st-site-wrapper'
    }
    constructor(props) {
        this.props = props;
        this.init();
    }
    updateProps(nextProps) {
        this.props = nextProps;
    }
    checkBreakpoint = () => {
        const $siteWrapper = $(this.selectors.siteWrapper);
        const width = $siteWrapper.width();
        let breakpoint;


        if (width < 768) {
            breakpoint = 'xs';
        } else if (width >= 768 && width < 1024) {
            breakpoint = 'sm';
        } else {
            breakpoint = 'md';
        }


        if (breakpoint !== this.props.breakpoint) {
            this.props.stateChange({ name: 'breakpoint', value: breakpoint });
        }
    }
    init() {
        this.bindEvents();
    }
    bindEvents() {
        this.checkBreakpoint();
        $(window).on('resize', this.checkBreakpoint);
    }
}


export default connect(
    store => ({
        breakpoint: store.state.breakpoint
    }),
    ({
        stateChange: actions.state.change
    })
)(Responsive)
