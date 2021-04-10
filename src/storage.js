export default (function () {
  const save = (name, data) => {
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch {
      localStorage.setItem(name, data);
    }
  };

  const load = (name) => {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch {
      return localStorage.getItem(name);
    }
  };
  return { save, load };
})();
