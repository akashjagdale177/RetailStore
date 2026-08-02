#!/bin/bash

kubectl apply -f 01-namespace.yaml

kubectl apply -f 02-mongo-headless-service.yaml
kubectl apply -f 03-mongo-statefulset.yaml
kubectl apply -f 04-mongo-rs-init.yaml

sleep 20

kubectl apply -f 05-configmap.yaml

kubectl apply -f 06-auth-service.yaml
kubectl apply -f 07-product-service.yaml
kubectl apply -f 08-cart-service.yaml
kubectl apply -f 09-order-service.yaml
kubectl apply -f 10-user-service.yaml
kubectl apply -f 11-notification-service.yaml
kubectl apply -f 12-gateway-service.yaml
kubectl apply -f 13-frontend.yaml

kubectl apply -f 14-ingress.yaml

echo "Deployment Completed"
