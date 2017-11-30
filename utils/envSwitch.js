function envSwitch({ production, development }) {
    switch (process.env.NODE_ENV) {
        case 'production':
            return production;
        case 'development':
            return development;
        default:
            return null;
    }
}


export default envSwitch;