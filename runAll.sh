cd backend
docker-compose up -d
cd ..
cd frontend
docker run -d -p 3100:8080 --name rc-fre rentzcar-front
echo ""
echo "Frontend Vue App provided in http://localhost:3100"
echo ""