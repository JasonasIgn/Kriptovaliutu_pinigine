import React from "react";
import request from "superagent";
import { User } from "../../resources/scripts/UserService";

class QuestionButton extends React.Component {
  handleQuestion() {
    let valid = true;
    const questionSelector = "question";

    const responseField = document.querySelector(".response");
    responseField.innerHTML = "";

    const questionField = document.getElementById(questionSelector);

    const questionErrorField = document.querySelector(`.${questionSelector}`);

    if (!questionField.value) {
      questionErrorField.innerHTML = "Laukas privalomas";
      valid = false;
    }

    if (valid) {
      request
        .post("http://localhost/api/klausimas/create.php")
        .send({
          Id: User.getId(),
          Klausimas: questionField.value
        })
        .set("Content-Type", "application/json")
        .then(res => {
          responseField.innerHTML = res.body.message;
        })
        .catch(err => {
          responseField.innerHTML = "Blogi prisijungimo duomenys";
        });
    }
  }
  render() {
    return (
      <div>
        <div
          className="question"
          onClick={() => {
            document.getElementById("questionModal").style.display = "block";
          }}
        />
        <div id="questionModal" className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                document.getElementById("questionModal").style.display = "none";
                document.getElementById("question").value = "";
                document.querySelector(".response").innerHTML = "";
              }}
            >
              &times;
            </span>
            <form>
              <h1 className="title"> Susisiekite</h1>
              <div className="form-group">
                <label className="col-form-label" htmlFor="question">
                  Klausimas
                </label>
                <textarea
                  type="question"
                  className="form-control"
                  id="question"
                />
              </div>
              <div className="response" />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleQuestion()}
              >
                Siųsti
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default QuestionButton;

window.onclick = function(event) {
  if (event.target == document.getElementById("questionModal")) {
    document.getElementById("questionModal").style.display = "none";
  }
};
