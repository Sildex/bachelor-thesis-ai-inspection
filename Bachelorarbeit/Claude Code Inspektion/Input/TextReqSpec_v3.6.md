# Textual Requirements Specification for the Taxi Evolution

**Document Number:** SRS2000001  
**Version:** 3.6  
**Date:** March 26, 2004

---

## 1 Introduction

The purpose of this document is to specify the requirements for the initial version of the Taxi Evolution project. The aim is to get a simple version of the system working to evaluate the system design and performance aspects.

This requirements specification is based on the specification provided by the Taxi company. Together with the company, several phases are defined for which the project should be divided into. The phases are:

1. **Initial phase** – This initial phase has the aim of evaluating architecture and functionality.
2. **Basic system phase** – When this phase is done, an operational system is available, with limited functionality. This system is put in real use to evaluate performance and function. User interfaces are an important part of this step.
3. **Complete system phase** – The last phase develops the rest of the system. At the end of the phase, the complete system is delivered.

From the original specification used in the contract bidding, a new requirement specification is developed. This document contains the first version of the new specification.

### 1.1 Explanation of the requirement specification

The requirements are mainly written in a feature style notation, using some state charts, context diagrams and other techniques to describe certain parts of the system.

### 1.2 Terminology

| Word | Explanation |
|------|-------------|
| Antenna server | The computer server responsible for handling the communication between the different antennas (if several) and the central. |
| Car | Car in this context is the same as taxi, unless stated otherwise. |
| Central | The central is the location where the operators are situated. See operator. |
| Driver | A driver is a person driving the taxi. |
| Operator | An operator is the person sitting in the central, receiving orders from customers and directing traffic. |
| Order | An order is the information on the customer specifications for a taxi ride. That is, pick-up place, name of customer, special criteria, possibly drop-off point etc. |
| Radio link/communication | The name for the system enabling the communication between the taxis and the central. This incurs the radio traffic to and from the cars to the antennas, as well as the communication from the antenna server and the central. |
| Taxi | The vehicle transporting the customers. |
| Voice radio communication | All communication is done through a radio link. See radio link. With voice radio communication refers to voice communication channeled through the radio link. |
| Zone | A geographical area defined by the taxi company. |

### 1.3 Structure of this document

An overview of the system is described in section 2. Section 3 defines the Functional requirements. Section 4 describes the non-functional requirements.

---

## 2 General Information

The system has three basic modules: the taxis, the communication link, and the central server. The database is stored in an independent system, not developed in this project. The user interface is not part of this specification.

**System actors:**
- **Driver** – The taxi driver in the car.
- **Operator** – The person in the central.

The customer is not considered a part of the system and is not an actor.

**Taxi states (Figure 3):**
- **Offline** – The taxi is not in use. Not the same as being out of radio contact.
- **Available** – The taxi is in use and available to accept orders.
- **Waiting for customer** – The taxi has an order and is waiting for the customer (also used when driving to pick-up location).
- **Driving** – The taxi has a customer and is transporting them.
- **Soon available** – The taxi will be available in a certain amount of time at some location.

---

## 3 Functional Requirements

### 3.1 Taxi

#### Driver

- **3.1.1** The taxi shall be able to be in different states: Offline, Available, Waiting for customer, Driving a customer, Soon available.
- **3.1.2** If a driver is not logged in, operations are limited to login and start alarm.
- **3.1.3** The log in shall be confirmed by taxi number and driver number.
- **3.1.4** A driver can only log in if the car is in state offline.
- **3.1.5** The system shall notify the driver whether a log in was successfully done or not.
- **3.1.6** When a driver is logging in, information about the position shall be sent to the central.
- **3.1.7** When a driver has logged in, the driver shall be in state available.
- **3.1.8** A driver shall be able to log out only if already logged in and in state available.
- **3.1.9** The log out shall be confirmed by taxi number and driver number.
- **3.1.10** The system shall notify the driver whether a log out was successfully done or not.
- **3.1.11** When the driver knows the arrival time, the time and zone shall be sent to the system.
- **3.1.12** When a taxi switches states, the central shall be informed of it.
- **3.1.13** When a taxi switches to state soon available, the system shall estimate how long it will take for the taxi to become available.
- **3.1.14** When the meter is turned on, the taxi shall be in state driving a customer.
- **3.1.15** When the meter is turned off, the taxi shall be in state available.
- **3.1.16** When the meter is turned off, the price of the fare shall be displayed and a receipt shall be printed.

#### Alarm

- **3.1.17** When the alarm is turned on, the central shall be notified immediately.
- **3.1.18** When the alarm is turned on, a voice channel shall be established immediately.
- **3.1.19** As long as the alarm is turned on, the taxi shall send its exact position to the central every 30 seconds.
- **3.1.20** The alarm shall work even if the driver is not logged in.
- **3.1.21** It shall not be possible for the driver to reset the alarm.

#### Orders

- **3.1.22** The driver shall be able to submit new orders to the system.
- **3.1.23** If there is not an available car for the submitted order, the order shall be rejected and a new order has to be submitted with different pick-up time.
- **3.1.24** The system shall notify the driver if an order from the driver was successfully sent to the system or not.
- **3.1.25** It shall only be possible to receive orders in state available.
- **3.1.26** It shall be possible to submit orders in all states, except offline.
- **3.1.27** When a driver receives an order, the order can either be accepted or cancelled.
- **3.1.28** If an order is not accepted nor denied within a time-out limit, the order shall be automatically cancelled.
- **3.1.29** It shall be possible to cancel an accepted order.

#### Communication and Information

- **3.1.30** It shall be possible to initiate voice communication from the taxi to the central.
- **3.1.31** The voice communication shall be made in a radio like manner.
- **3.1.32** When voice communication is initiated from the driver to the central, the call is put in a queue.
- **3.1.33** The voice communication shall be cancelled when either the driver or operator cancel the communication.
- **3.1.34** It shall be possible to receive text messages from the central.
- **3.1.35** The cars shall automatically send an acknowledgement when they receive a text message.
- **3.1.36** A graphical indicator shall indicate a received text message in the car.
- **3.1.37** An audio notification shall indicate a received text message in the car.
- **3.1.38** The message shall be marked read when the driver has read the text message.
- **3.1.39** Sending text messages shall not interfere with voice communication.
- **3.1.40** The driver shall be able to see how many cars there are in a specific zone.
- **3.1.41** The driver shall be able to see how many orders there are in a specific zone.
- **3.1.42** Information about each zone shall be sent to the taxi whenever there is an update (new order, or car leaving/entering a zone).

#### Properties

- **3.1.43** Different drivers shall be able to have different properties, e.g. if they speak a certain language.
- **3.1.44** Different cars shall be able to have different properties, e.g. how many passengers can be carried, or if a car is allergy marked.
- **3.1.45** The operator shall be able to view the properties about a specific car.
- **3.1.46** The operator shall be able to view the properties about a specific driver.
- **3.1.47** The operator shall be able to view the properties of a set of cars.
- **3.1.48** The operator shall be able to view the properties of a set of drivers.
- **3.1.49** The drivers shall be able to view their own properties.

---

### 3.2 Central

The central component has two main functions: serving as the interface for operators, and storing information about available taxis (including positioning).

#### Operator

- **3.2.1** The operator shall be able to be in different states: Offline (logged out), Online (logged in).
- **3.2.2** If an operator is not logged in, operations are limited to login.
- **3.2.3** The log in shall be confirmed by user identification and password.
- **3.2.4** The system shall notify the operator if a log in was successfully done or not.
- **3.2.5** An operator shall be able to log out only if already logged in.
- **3.2.6** The system shall notify the operator if a log out was successfully done or not.

#### Alarm

- **3.2.7** When the alarm is turned on, the central shall be notified immediately.
- **3.2.8** When the alarm is turned on, a voice channel shall be established immediately.
- **3.2.9** As long as the alarm is turned on, the exact position of the alarming car shall be sent to the central every 30 seconds.
- **3.2.10** The operator shall be able to reset the alarm.

#### Orders and Dispatcher

- **3.2.11** The operator shall be able to submit new orders to the system.
- **3.2.12** The system shall notify the operator if an order was successfully submitted or not.
- **3.2.13** If there are one or several cars matching a certain order, the order shall be automatically dispatched to a car.
- **3.2.14** The operator shall be able to update already submitted orders.
- **3.2.15** The system shall be able to send orders for manual dispatch to the operator.
- **3.2.16** The system shall present an estimate of how long time it takes for a car to be available.
- **3.2.17** The system shall notify the operator when it is time to dispatch a submitted order.
- **3.2.18** If an order has dispatch time set to less than zero, the order will be dispatched manually.
- **3.2.19** If an order has dispatch time set to zero, the system will decide when the order will be dispatched.
- **3.2.20** If an order has dispatch time set to greater than zero, the order will be dispatched the specified time before pick-up time.
- **3.2.21** If the order has the property taxi set to zero, the system will decide to which car the order is dispatched first.
- **3.2.22** If an order is manually dispatched to a driver and the order is denied, cancelled or ignored, the order will be returned to the operator for manual dispatch.

#### Communication and Information

- **3.2.23** It shall be possible for the operator to initiate voice communication from the central to a specific car.
- **3.2.24** The voice communication shall be made in a radio like manner.
- **3.2.25** The voice communication shall be cancelled when either the driver or operator cancel the communication.
- **3.2.26** The operator shall be able to manually check available cars over a voice communication link.
- **3.2.27** It shall be possible to send text messages to one car.
- **3.2.28** It shall be possible to send text messages to a group of cars.
- **3.2.29** The text messages shall not interfere with the voice communication.
- **3.2.30** The operator shall be able to see how many cars there are in a specific zone.
- **3.2.31** The operator shall be able to see how many orders there are in a specific zone.
- **3.2.32** Information about each zone shall be sent to the operator whenever the operator requests it.
- **3.2.33** When a driver is logged in, the system shall send overview information on all zones.

#### Properties

- **3.2.34** Information about properties shall be stored until they are changed by an operator.
- **3.2.35** It shall be possible to update car properties.
- **3.2.36** It shall be possible to update driver properties.
- **3.2.37** The system shall acknowledge when the car properties are updated.
- **3.2.38** The system shall acknowledge when the driver properties are updated.

---

### 3.3 Communication Link

The communication link handles guaranteed delivery and fault recovery. It has two main components: the transmission media and the communication server.

- **3.3.1** The communication link interface shall accept text messages to send to a destination.
- **3.3.2** All coding of the messages shall be handled by the taxi system and central system.
- **3.3.3** The communication link shall be able to guarantee delivery and recover from failures.
- **3.3.4** The communication between the taxi and the communication link shall be radio based using private antennas belonging to the taxi company.
- **3.3.5** The communication between the central and the communication link shall be done through a permanent network connection.
- **3.3.6** When a car is in one of the zones, it shall always be covered by at least one communication link.
- **3.3.7** The system shall be scalable, but must initially handle 150 cars.
- **3.3.8** It shall be possible to send messages from the communication link to groups of cars or single cars.
- **3.3.9** The communication link shall support both text information and speech information independently.

---

### 3.4 Positioning System

The positioning system is part of the Taxi component. There are two modes:

1. **Normal mode** – No customer in the car. Position is sent to the central only when changing zone.
2. **Meter mode** – Customer in the taxi (meter running). Exact coordinates are sent to the central every 30 seconds.

Positioning information from a ride is stored in the central for the last 24 hours. Zone information from normal mode is not stored.

- **3.4.1** The positioning system should deliver a zone indicating the position of a car when the car is in state Available.
- **3.4.2** The positioning information of a car in state Available is only sent when there is an update (when the information in the central is no longer accurate).
- **3.4.3** The positioning system should be able to send the exact positioning when the driver is driving a customer (meter running).
- **3.4.4** When the meter is running, the position is sent every 30 seconds to the central.
- **3.4.5** The central system should send updates on the traffic overview as soon as there is a change in a zone, either on available cars or on available orders.

---

## 4 Non-Functional Requirements

### 4.1 Requirements

- **4.1.1 Driver integrity** – The position of the car should not be displayed exactly to users of the system, except when driving a customer.
- **4.1.2 User identity** – All users of the system, drivers or operators, shall have a unique identification number.
- **4.1.3 Usability** – The system must be user-friendly. In the cars, the interface must be as non-intrusive as possible for the driver. Most functions should be possible to perform while driving. In the central, operators must be able to easily enter new orders and view the traffic overview.
- **4.1.4 Robust** – The different systems should not affect one another. A failure in one system (ordering, radio communication, positioning) should not affect the others.
- **4.1.5 Consistent** – The system should work consistently even if a car is out of range from the central.
- **4.1.6 Legal** – The system must comply with all laws and regulations applicable to a taxi organization.
- **4.1.7 GPS** – GPS is used as the positioning system. The positioning should be handled automatically without driver interference.
- **4.1.8 Uptime** – The taxi system must have a total uptime of at least 99% of operational time. The central system must have an uptime of at least 99.9%.
- **4.1.9 Response time** – All radio communications (non-voice) should be negotiated in less than 5 seconds in 99% of all transfers. There must never be more than 1 second delay in voice communication.
- **4.1.10 Quality** – The voice communication shall use a sample frequency of 8000 Hz and 8 bits per sample (equivalent to GSM voice quality, generating 64 kBPS traffic).
- **4.1.11 Capacity** – All non-voice communication should be handled independently of load and number of taxis. The system should handle up to 5 parallel voice channels at a time.
- **4.1.12 Maintenance** – The number of cars, centrals, and antennas in the system should be changeable.
