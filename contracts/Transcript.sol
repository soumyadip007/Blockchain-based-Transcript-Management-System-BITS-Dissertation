pragma solidity ^0.4.17;

contract Transcript {
    string public payload;

    function Transcript(
        string _payload
    )  public{
        payload = _payload;
    }

    function setTranscript(
        string _payload
    )
        public
    {
        payload = _payload;
    }

    function getpayload() public view returns (string) {
        return payload;
    }

}
