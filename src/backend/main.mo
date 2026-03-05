import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Custom Types
  type ScanRecord = {
    id : Nat;
    timestamp : Time.Time;
    diseaseName : Text;
    confidenceScore : Nat;
    cropType : ?Text;
    imageNote : ?Text;
  };

  module ScanRecord {
    public func compareByTimestampDesc(record1 : ScanRecord, record2 : ScanRecord) : Order.Order {
      Int.compare(record2.timestamp, record1.timestamp);
    };
  };

  // Persistent Data Structures
  let scanRecords = Map.empty<Nat, ScanRecord>();
  var nextId = 1;

  // Core Functionality
  public shared ({ caller }) func saveScan(diseaseName : Text, confidenceScore : Nat, cropType : ?Text, imageNote : ?Text) : async Nat {
    if (confidenceScore > 100) {
      Runtime.trap("Confidence score must be between 0 and 100");
    };

    let scanRecord : ScanRecord = {
      id = nextId;
      timestamp = Time.now();
      diseaseName;
      confidenceScore;
      cropType;
      imageNote;
    };

    scanRecords.add(nextId, scanRecord);
    let recordId = nextId;
    nextId += 1;
    recordId;
  };

  public query ({ caller }) func getScanHistory() : async [ScanRecord] {
    scanRecords.values().toArray().sort(ScanRecord.compareByTimestampDesc);
  };

  public query ({ caller }) func getScanById(id : Nat) : async ScanRecord {
    switch (scanRecords.get(id)) {
      case (null) { Runtime.trap("Scan record not found") };
      case (?record) { record };
    };
  };

  public shared ({ caller }) func clearHistory() : async () {
    scanRecords.clear();
  };

  public query ({ caller }) func getScanCount() : async Nat {
    scanRecords.size();
  };
};
