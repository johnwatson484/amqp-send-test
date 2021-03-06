# amqp-send-test
Send JSON test message to AMQP message queue from within a Kubernetes cluster

## Test steps
- clone repository
  
- add `./helm/amqp-send-test/production-values.yaml`. This file is included in `.gitignore`
  
- populate `production-values.yaml` with queue and pod values. `values.yaml` gives example values

- edit `message.json` file to desired message content
  
- apply Helm chart to current namespace  
  `helm upgrade --install -f ./helm/amqp-send-test/production-values.yaml amqp-send-test ./helm/amqp-send-test`

- copy `message.json` to container
  `kubectl cp ./message.json NAMESPACE/POD_NAME:/usr/src/app`
  
- attach shell to pod  
  `kubectl exec -it POD_NAME -- /bin/sh`

- send message  
  `node send-message.js`
