module.exports = {
  engine: ({ marp }) => {
    // Strings ensure false survives Marpit's directive-to-attribute conversion.
    marp.customDirectives.local.logo = (value) => {
      if (value === true || value === 'true') return { logo: 'true' };
      if (value === false || value === 'false') return { logo: 'false' };
      return {};
    };
    marp.markdown.core.ruler.after('marpit_directives_apply', 'trustpoint_logo', (state) => {
      for (const token of state.tokens) {
        if (token.type !== 'marpit_slide_open') continue;
        const logo = token.meta?.marpitDirectives?.logo;
        if (logo === 'true' || logo === 'false') token.attrSet('data-logo', logo);
      }
    });
    return marp;
  },
};
