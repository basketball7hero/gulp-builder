function render(page) {
    return (req, res) => {
        const { session, user } = req.ctx;
        if (session && user) return res.render(page, { user: user.transform() });
        return res.render(page);
    }
}


export default render;
