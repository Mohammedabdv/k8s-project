# 🛍️ Fashionista — Kubernetes Deployment

A production-ready Kubernetes setup for the **Fashionista** e-commerce platform, featuring a React frontend, Node.js backend, and MongoDB database — fully containerized and orchestrated with Kubernetes.

---

## 🏗️ Architecture

```
User (Browser)
      ↓
Ingress (NGINX)
      ↓
Frontend Service (ClusterIP:80)
      ↓
Backend Service (ClusterIP:8000)
      ↓
MongoDB Service (ClusterIP:27017)
      ↕
PersistentVolumeClaim (5Gi)
```

---

## 📦 Project Structure

```
k8s-project/
└── kubernetes/
    ├── namespace.yml                    # Fashionista Namespace
    ├── ingress.yml                      # NGINX Ingress
    ├── secret.yml                       # Secrets (JWT, Stripe, Braintree)
    ├── frontend/
    │   ├── frontend-deployment.yml      # Frontend Deployment (2 replicas)
    │   └── frontend-service.yml         # Frontend ClusterIP Service
    ├── backend/
    │   ├── backend-deployment.yml       # Backend Deployment (2 replicas)
    │   ├── backend-service.yml          # Backend ClusterIP Service
    └── database/
        ├── mongodb-statefulset.yml      # MongoDB Statefulset (1 replica)
        └── mongodb-service.yml          # MongoDB ClusterIP Service
```

---

## ⚙️ Components

| Component | Image | Replicas | Port |
|---|---|---|---|
| Frontend | `mohammedabdv/fashionista-frontend:latest` | 2 | 80 |
| Backend  | `mohammedabdv/fashionista-backend:latest`  | 2 | 8000 |
| MongoDB  | `mongo:6-jammy` | 1 | 27017 |

---

## 🚀 Prerequisites

- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- Kubernetes cluster running (local or cloud)
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) installed

---

## 🛠️ Setup

### 1. Create Namespace
```bash
kubectl create namespace fashionista
```

### 2. Deploy Everything
```bash
kubectl apply -f kubernetes/
```

### 3. Verify Deployment
```bash
kubectl get all -n fashionista
```

---

## 🌐 Access the App

### Step 1 — Add to hosts file

**Windows**: `C:\Windows\System32\drivers\etc\hosts`

**Mac/Linux**: `/etc/hosts`

```
127.0.0.1  fashionista.localhost
```

### Step 2 — Port Forward
```bash
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 80:80
```

### Step 3 — Open Browser
```
http://fashionista.localhost
```


---

## 🔍 Useful Commands

```bash
# Check all resources
kubectl get all -n fashionista

# Check pod logs
kubectl logs -f deployment/backend-deployment -n fashionista
kubectl logs -f deployment/frontend-deployment -n fashionista

# Check ingress
kubectl get ingress -n fashionista

# Restart a deployment
kubectl rollout restart deployment/backend-deployment -n fashionista

# Delete everything
kubectl delete namespace fashionista
```

---

## 🔒 Security Notes

- All sensitive keys are stored in Kubernetes Secrets — **never hardcoded**
- `secret.yml` is listed in `.gitignore` and will **never** be pushed to GitHub
- Use `secret.example.yml` as a reference template

---

## 📊 Resource Limits

| Component | Memory Request | Memory Limit | CPU Request | CPU Limit |
|---|---|---|---|---|
| Frontend | 64Mi  | 128Mi | 50m  | 200m |
| Backend  | 128Mi | 256Mi | 100m | 300m |
| MongoDB  | 256Mi | 512Mi | 250m | 500m |

---

## 🧰 Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB 6
- **Orchestration**: Kubernetes
- **Ingress**: NGINX
- **Payments**: Stripe & Braintree
- **Auth**: JWT

