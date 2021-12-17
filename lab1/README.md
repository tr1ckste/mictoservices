# Lab 1

##Створюємо docker images для першого та другого сервісу:

```
docker build -t tr1ckste/service1:0.1 ./1
docker build -t tr1ckste/service2:0.1 ./2
```

##Заливаємо images на docker hub

```
docker push tr1ckste/service1:0.1
docker push tr1ckste/service2:0.1
```

##Для того щоб ввімкнути hyper-v вводимо в PowerShell команду:

```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

##Далі:

```
minikube start --driver=hyperv
minikube addons enable ingress
```

##Створюємо сервіси:

```
kubectl apply -f service1-deployment.yaml
kubectl apply -f service2-deployment.yaml

kubectl apply -f service1.yaml
kubectl apply -f service1.yaml
```

## Створюємо ingress:

```
kubectl apply -f ingress.yaml
```

## Відправляємо запити

```
curl "$(minikube ip)/api/service1"
curl "$(minikube ip)/api/service2"
```

Відповіді:

```
StatusCode        : 200
StatusDescription : OK
Content           : {72, 105, 33, 32...}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Content-Length: 20
                    Date: Wed, 15 Dec 2021 11:38:17 GMT

                    Hi! This is service1
Headers           : {[Connection, keep-alive], [Content-Length, 20], [Date, Wed, 15 Dec 2021 11:38:17 GMT]}
RawContentLength  : 20

----------------------------

StatusCode        : 200
StatusDescription : OK
Content           : {72, 105, 33, 32...}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Content-Length: 20
                    Date: Wed, 15 Dec 2021 11:38:21 GMT

                    Hi! This is service2
Headers           : {[Connection, keep-alive], [Content-Length, 20], [Date, Wed, 15 Dec 2021 11:38:21 GMT]}
RawContentLength  : 20
```


