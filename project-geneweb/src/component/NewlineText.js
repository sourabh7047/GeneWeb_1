function NewlineText(_data) {
  return new Promise((resolve, reject) => {
    try {
      let newText = _data.split("\n").map((str) => <p>{str}</p>);
      resolve(newText);
    } catch (err) {
      reject(err);
    }
  });
}

export default NewlineText;
