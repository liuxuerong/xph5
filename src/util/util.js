const xpToken = {
  setFormToken: function (token) {
    return {
      'Content-Type': 'application/X-WWW-FORM-URLENCODED',
      'Authorization': token
    }
  },
  setJsonToken: function (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
}
export { xpToken }
