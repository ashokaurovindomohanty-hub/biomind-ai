import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import AccessControl "authorization/access-control";

import MixinAuthorization "authorization/MixinAuthorization";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type LabValue = {
    key : Text;
    value : Float;
  };

  public type Patient = {
    id : Text;
    name : Text;
    age : Nat;
    sex : Text;
    clinicalHistory : Text;
    labValues : [LabValue];
  };

  type Differential = {
    condition : Text;
    probability : Float;
  };

  type DiagnosisResult = {
    condition : Text;
    confidence : Float;
    differentials : [Differential];
  };

  let patients = Map.empty<Text, Patient>();
  let analysisResults = Map.empty<Text, DiagnosisResult>();

  public shared ({ caller }) func addPatient(patient : Patient) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add patients");
    };
    patients.add(patient.id, patient);
  };

  public query ({ caller }) func getAllPatients() : async [Patient] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get patients");
    };
    patients.values().toArray();
  };

  public shared ({ caller }) func analyzePatient(patient : Patient) : async DiagnosisResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can analyze patients");
    };
    let scores = calculateScore(patient.labValues);

    var highestScore = scores.ards;
    var condition = "ARDS";

    if (scores.sepsis > highestScore) {
      highestScore := scores.sepsis;
      condition := "Sepsis";
    };
    if (scores.covid > highestScore) {
      highestScore := scores.covid;
      condition := "COVID-19";
    };
    if (scores.pneumonia > highestScore) {
      highestScore := scores.pneumonia;
      condition := "Pneumonia";
    };
    if (scores.heartFailure > highestScore) {
      highestScore := scores.heartFailure;
      condition := "Heart Failure";
    };

    var totalScore = scores.ards + scores.sepsis + scores.covid + scores.pneumonia + scores.heartFailure;

    if (totalScore == 0.0) {
      totalScore := 1.0;
      highestScore := 1.0;
    };

    let differentials = [
      {
        condition = "ARDS";
        probability = (scores.ards / totalScore) * 100.0;
      },
      {
        condition = "Sepsis";
        probability = (scores.sepsis / totalScore) * 100.0;
      },
      {
        condition = "COVID-19";
        probability = (scores.covid / totalScore) * 100.0;
      },
      {
        condition = "Pneumonia";
        probability = (scores.pneumonia / totalScore) * 100.0;
      },
      {
        condition = "Heart Failure";
        probability = (scores.heartFailure / totalScore) * 100.0;
      },
    ];

    let sortedDiffs = differentials.sort(
      func(a, b) {
        if (a.probability > b.probability) { #less } else if (a.probability < b.probability) { #greater } else {
          #equal;
        };
      }
    );

    let result : DiagnosisResult = {
      condition;
      confidence = (highestScore / totalScore) * 100.0;
      differentials = sortedDiffs;
    };

    analysisResults.add(patient.id, result);

    result;
  };

  func calculateScore(labValues : [LabValue]) : {
    ards : Float;
    sepsis : Float;
    covid : Float;
    pneumonia : Float;
    heartFailure : Float;
  } {
    var ards = 0.0;
    var sepsis = 0.0;
    var covid = 0.0;
    var pneumonia = 0.0;
    var heartFailure = 0.0;

    for (lab in labValues.values()) {
      switch (lab.key) {
        case ("WBC") {
          if (lab.value > 11.0) {
            sepsis := sepsis + 10.0;
            pneumonia := pneumonia + 5.0;
          } else if (lab.value < 4.0) {
            covid := covid + 7.0;
          };
        };
        case ("CRP") {
          if (lab.value > 10.0) {
            ards := ards + 8.0;
            pneumonia := pneumonia + 7.0;
            covid := covid + 5.0;
          };
        };
        case ("Ferritin") { if (lab.value > 500.0) { ards := ards + 7.0 } };
        case ("D-dimer") { if (lab.value > 1.0) { ards := ards + 6.0 } };
        case ("SpO2") {
          if (lab.value < 90.0) {
            ards := ards + 15.0;
            covid := covid + 10.0;
          } else if (lab.value < 95.0) {
            heartFailure := heartFailure + 8.0;
          };
        };
        case ("BNP") { if (lab.value > 400.0) { heartFailure := heartFailure + 15.0 } };
        case ("NT-proBNP") { if (lab.value > 900.0) { heartFailure := heartFailure + 15.0 } };
        case ("PCT") {
          if (lab.value > 0.5) {
            pneumonia := pneumonia + 7.0;
            sepsis := sepsis + 8.0;
          };
        };
        case ("LDH") { if (lab.value > 250.0) { covid := covid + 7.0 } };
        case ("Ferritin") { if (lab.value > 300.0) { covid := covid + 6.0 } };
        case (_) {};
      };
    };

    { ards; sepsis; covid; pneumonia; heartFailure };
  };
};
