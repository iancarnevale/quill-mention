import "./styles.css";
import Quill from "quill";
import mention from "quill-mention";

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" }
];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" }
];

var quill = new Quill("#editor", {
  debug: "info",
  theme: "snow",
  modules: {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function(searchTerm, renderList, mentionChar) {
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      }
    }
  }
});
