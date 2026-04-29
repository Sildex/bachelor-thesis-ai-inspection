# Use Cases for the Taxi Evolution

**Document Number:** SRS2000001  
**Version:** 3.3  
**Date:** October 5, 2005

---

## 1 Use Cases

### 1.1 Taxi: Submit order

Purpose: The driver receives an order from a customer. The driver should be able to submit an order from the terminal in the car. An order can be submitted in all states, except in "Offline".

Tasks:

1. A customer wants a taxi.
2. The order is entered on the terminal in the car.
3. The order is sent to the central.
4. The order is confirmed by the central.

Variants:

4b. No available taxis at the desired time. A new order must be submitted with different pick-up time in a new request from the taxi.

---

### 1.2 Central: Submit order

Purpose: Orders are received by the operators. These are submitted into the system.

Tasks:

1. The operator receives an order.
2. The operator submits the order into the system. The order may contain specific requests such as allergy, non-smoker etc. The order can be prioritized, i.e. some customers are more important than others.
3. The system confirms the order to the operator. The order is automatically dispatched to a car.

Variants:

3b. If the order is very close in time the system presents an estimate of how long it takes for a car to be available.

---

### 1.3 Central: Display traffic overview

Purpose: The operator should be able to see available cars and orders in each zone. This is used to estimate how long it takes for a car to be present at the pick-up location.

Tasks:

1. The operator selects the traffic overview on the terminal.
2. The overview is displayed.

Variants:

2b. The system is down and an overview cannot be presented. The operator has to check available cars manually over a voice communication link.

---

### 1.4 Taxi: Log in

Purpose: The driver logs on to the system to acknowledge presence and to be able to receive orders. (Note that a driver can drive different taxis at different times. Also note that a taxi has many different drivers, although only one driver at a time.)

Tasks:

1. The car is in state "Offline".
2. The driver swipes the identification card in the terminal in the car.
3. The terminal sends the position and driver information to the central.
4. The central confirms the log in.
5. The car sends the position (zone).
6. The central starts sending overview information on all zones.
7. The car is in the state "Available".

Variants:

1b. The car is not in the state offline. There can be only one driver logged in at the same time in the car terminal. The car has to be in state "Offline" in order to allow new logins.

4b. The card is not valid. The central rejects the driver. The driver and the car are not logged in and remain in state "Offline".

---

### 1.5 Taxi: Receive order

Purpose: The driver receives an order from the central.

Tasks:

1. The car is in the state "Available".
2. Order is sent to the terminal in the car.
3. The driver accepts the order.
4. The central confirms order.
5. The driver goes to the designated address.
6. The car is in state "Waiting for customer".

Variants:

3b. The order is neither rejected nor accepted within 2 minutes. The order is automatically canceled.

4b. The order is rejected due to some reason. The taxi remain in state "Available".

---

### 1.6 Taxi: Driving a customer

Purpose: The driver has a customer in the car and is about to transport the customer to the designated address.

Tasks:

1. Car in state "Available".
2. Driver receives order. See receive order (use-case 1.5).
3. Car in state "Waiting for customer".
4. Drive to the pick-up location.
5. Wait until customer arrives.
6. Start meter and transportation.
7. Car in state "Driving".
8. When driver is confident in time of arrival, send arrival zone and time to central.
9. Car in state "Soon available".
10. Arrival at destination. Charge customer and print out receipt.
11. Car in state "Available". The car sends the position (zone).

Variants:

2b. The driver picks up customer without order. Use case starts at step 6.

6b. Customer does not show up. Car is put in state "Available".

9b. Driver does not use the "Soon available" function. Step 9 is skipped.

---

### 1.7 Central: Handle incoming alarms

Purpose: If a driver sounds the alarm, an operator is responsible for handling the event.

Tasks:

1. An incoming alarm opens a voice radio connection to the car. All sounds from the car are sent to the operator.
2. The operator determines the course of action.
3. When the situation causing the alarm is no longer current, the operator resets the alarm. This can only be done by the operator.

Variants:

1b. The event is a false alarm. The operator decides whether it is false or not. The operator chooses to cancel or not.

---

### 1.8 Taxi: Alarm event

Purpose: If the driver, for some reason, feels threatened there is an alarm system which notifies the central of the problems.

Tasks:

1. The driver is in some kind of trouble and hits the alarm button.
2. The voice radio channel to the central is opened from the taxi to the central.
3. The taxi sends exact coordinates to the central every 30 seconds.
4. The channel is open until the central resets the alarm. The voice link is terminated.

---

### 1.9 Taxi: View traffic overview

Purpose: The driver should be able to see in which zones there are cars and the amount of outstanding orders in each zone.

Tasks:

1. The driver requests traffic overview information on the terminal in the car.
2. Overview information is sent to the terminal from the central.
3. The terminal displays the information.

---

### 1.10 Central: Dispatch order

Purpose: Orders can be marked for manual dispatching. These orders have to be manually dispatched by an operator. Default is automatic dispatch.

Tasks:

1. The system notifies the operator in an appropriate time before pick-up time.
2. The operator selects a car to send the order to. The selection of car is based on the taxi number. That is, the selection is not dependent of the current status of the car.
3. The system sends the order.
4. The car sends an acceptance notification of the order. The system automatically confirms the acceptance notification to the car.
5. The system notifies the operator that the order has been accepted.

Variants:

3b. Parts of the system are down, making automatic dispatch impossible. The operator has to dispatch all orders manually.

4b. The designated car rejects the order or is busy. The order must be manually dispatched to another car.

---

### 1.11 Central: Send text message

Purpose: The operators have the option to send text message to the cars. This can be done to a specific car, to a certain set of cars or to all cars.

Tasks:

1. The operator selects cars in the system to send a text message.
2. The text is entered.
3. The destination is chosen. This can be a specific car, a group of car, or all cars independent of state.
4. The message is sent. Each car receiving the message should acknowledge the reception to the central automatically.
5. The system confirms the delivery of the text message.

Variants:

4b. If message is sent to a specific car and the message cannot reach the destination, the operator should be notified of this.

4c. If the message is sent to a group of cars or all cars, and none of the cars acknowledges the message, this should be noted to the operator. If, however, only some cars don't acknowledge, no notification is necessary.

---

### 1.12 Central: Log in to central system

Purpose: The operators log in to the central system to be able to use it.

Tasks:

1. Enter user identification and password.
2. The system verifies the identification.
3. The user is logged on the system.

Variants:

2b. The user information is incorrect. The operator is not logged on.

---

### 1.13 Central: Initiate radio communication

Purpose: The operator should have the possibility to contact a specific driver over a voice radio connection. Can be used when the ordering system is down, but the communication link is operational.

Tasks:

1. The operator selects radio call.
2. The system displays a list of available cars.
3. The operator chooses a car to contact.
4. The communication link is established and conversation is possible in a radio like manner. See receive voice radio communication.
5. Both sides cancel the communication link. The voice link is terminated.

Variants:

4b. The wanted car is not available. No connection is established.

---

### 1.14 Taxi: Initiate radio communication

Purpose: The driver should have the possibility to contact the central through a voice channel using this system. Can be used if the ordering system is down, but the communication link is operational.

Tasks:

1. The driver initiates the communication on the terminal in the car.
2. The call is placed in an incoming call queue in the central.
3. The call is put through and conversation is possible in a radio like manner. That is, a button has to be pressed for the speech to be sent.
4. Both sides cancel the conversation. The voice link is terminated.

---

### 1.15 Taxi: Incoming radio communication

Purpose: The central can initiate a voice contact to be able to talk to the driver. Can be used if the ordering system is down, but the communication link is operational.

Tasks:

1. An incoming radio request from the central.
2. The connection is put through and conversation is possible in a radio like manner. See radio communication initiated by the driver.
3. Both sides cancel the communication. The voice link is terminated.

Variants:

2b. The driver presses a cancellation button. The connection is canceled.

3b. If the connection is broken during conversation due to loss of contact with server, the connection is simply broken and the terminal returned to the previous state.

---

### 1.16 Taxi: View properties

Purpose: The driver should be able to view the properties of the car and also the properties on the driver him/herself. Note that the drivers can only view information on themselves.

Tasks:

1. The driver chooses on the terminal in the car to see the properties associated with the car and driver.
2. The central sends the information to the car terminal.

---

### 1.17 Central: Incoming radio communication

Purpose: The drivers have the possibility to contact the central through a voice radio channel.

Tasks:

1. A free operator takes the incoming communication requests.
2. A connection with the car is established. Conversation is possible in a radio like manner. That is, a button is pressed to enable sending of speech information.
3. The connection is canceled from both side. The voice link is terminated.

Variants:

2b. If the connection is broken during conversation due to loss of contact with the car, the connection is simply broken.

---

### 1.18 Central: Update driver properties

Purpose: Each driver has a set of properties. These can be promptness, smoker or non-smoker, number of complaints, etc. The operator is responsible for updating this information.

Tasks:

1. A request to update driver properties is received.
2. The operator selects the driver in question on the update properties system.
3. The properties are updated and submitted.
4. The system acknowledges the changes.

Variants:

2b. Driver not registered in the system. The driver must first be registered in the system. This is done with other systems.

---

### 1.19 Taxi: Receive text message

Purpose: The central has the possibility to send text messages to the cars. This can be done to a specific car, to a certain set of cars or to all cars.

Tasks:

1. When a text message is received, a graphical indication is displayed on the terminal as well as an audio notification.
2. The drivers presses a button to read the message.
3. The message is marked as read.
