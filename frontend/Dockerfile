# --- Stage 1: Build the React application ---
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    COPY . .
    
    # This creates the optimized 'dist' folder
    RUN npm run build
    
    # --- Stage 2: Serve the built assets with Nginx ---
    FROM nginx:stable-alpine
    
    # Copy the static files from the builder stage
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Remove the default Nginx configuration
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy our custom Nginx configuration
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80
    EXPOSE 80
    
    # Start Nginx when the container launches
    CMD ["nginx", "-g", "daemon off;"]