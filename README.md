# mocMock
A simple mock contract, tests and tasks to check conditional publishing conditions.

## To run tests
`npx hardhat test`

## To start a local node
`npx hardhat node`

## To deploy contracts on local node
`npx hardhat ignition deploy ./ignition/modules/MoCMock.ts --network ganache`

## To execute a task
`npx hardhat <TASK_NAME> <CONTRACT_ADDRESS> <...ARGS> --network <NETWORK>`

The following tasks are available:
### Reset
- `reset`: Reset all mock state vars to cond pub === FALSE

### Query
- `readAll`: Query all state vars + current block
- `readQAClock`: Query qACLockedInPending var
- `readEma`: Query shouldCalculateEma()
- `readBts`: Query bts var
- `readNextTC`: Query nextTCInterestPayment var

### Set publishing condition to `true`
- `setAll-t`: Set all mock state vars to cond pub === TRUE
- `setQAClock-t`: Set qACLockedInPending to 1 (Condition: qACLockedInPending > 0)
- `setEma-t`: Set emaBool var to `true` (Condition: shouldCalculateEma() == true)
- `setBts-t`: Set bts var to 0 (Condition: bts == 0)
- `setNextTC-t`: Set nextTCInterestPayment to `currentBlock - 1` (Condition: currentBlock > nextTCInterestPayment)

> Notice that all tasks with `-t` appended produce the publishing condition to be evaluated to true.

### Set vars to arbitrary values
- `setQAClock`: Set qACLockedInPending var to an arbitrary value
- `setEma`: Set emaBool var -  0 (false) : 1 (true)
- `setBts`: Set bts var to an arbitrary value
- `setNextTC`: Set nextTCInterestPayment var to an arbitrary value

