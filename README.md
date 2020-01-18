# amqp-send-test
Send test message to AMQP message queue with a Kubernetes cluster

# Test steps
- clone repository
  
- add `./helm/amqp-send-test/production-values.yaml`. This file is included in `.gitignore`
  
- populate `production-values.yaml` with queue and pod values. `values.yaml` gives example values
  
- apply Helm chart to current namespace  
  `helm upgrade --install -f ./helm/amqp-send-test/production-values.yaml amqp-send-test ./helm/amqp-send-test`

- attach shell to pod  
  `kubectl exec -it POD_NAME -- /bin/sh`

- send message  
  `node send-message.js`
