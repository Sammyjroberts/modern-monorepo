#!/bin/bash

# Go 1.24.1 Installation Script
# This script installs Go 1.24.1 on Linux and configures the environment

# Exit immediately if a command exits with a non-zero status
set -e

# Check if script is run with root privileges
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root or with sudo"
    exit 1
fi

# Define variables
GO_VERSION="1.24.1"
GO_DOWNLOAD_URL="https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
GO_INSTALL_DIR="/usr/local"
GO_TARBALL="go${GO_VERSION}.linux-amd64.tar.gz"
PROFILE_FILE="/etc/profile"

echo "Starting Go ${GO_VERSION} installation..."

# Step 1: Download Go tarball if not already downloaded
if [ ! -f "${GO_TARBALL}" ]; then
    echo "Downloading Go ${GO_VERSION}..."
    wget -q --show-progress "${GO_DOWNLOAD_URL}" -O "${GO_TARBALL}"
    echo "Download complete!"
else
    echo "Using existing ${GO_TARBALL}"
fi

# Step 2: Remove any previous Go installation
echo "Removing any existing Go installation from ${GO_INSTALL_DIR}/go..."
rm -rf "${GO_INSTALL_DIR}/go"

# Step 3: Extract the archive
echo "Extracting Go ${GO_VERSION} to ${GO_INSTALL_DIR}..."
tar -C "${GO_INSTALL_DIR}" -xzf "${GO_TARBALL}"

# Step 4: Set up environment variables
echo "Configuring environment variables..."
if grep -q "export PATH=\$PATH:/usr/local/go/bin" "${PROFILE_FILE}"; then
    echo "PATH entry already exists in ${PROFILE_FILE}"
else
    echo "Adding Go to PATH in ${PROFILE_FILE}"
    echo "export PATH=\$PATH:/usr/local/go/bin" >> "${PROFILE_FILE}"
fi

# Apply changes to current shell
export PATH=$PATH:/usr/local/go/bin

# Step 5: Verify installation
echo "Verifying Go installation..."
if go version | grep -q "${GO_VERSION}"; then
    echo "Go ${GO_VERSION} installed successfully!"
    go version
else
    echo "Go installation verification failed."
    exit 1
fi

# Step 6: Cleanup
echo "Cleaning up..."
read -p "Do you want to delete the downloaded tarball? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -f "${GO_TARBALL}"
    echo "Tarball removed."
else
    echo "Tarball kept at $(pwd)/${GO_TARBALL}"
fi

echo
echo "Go ${GO_VERSION} installation complete!"
echo "To use Go in your current shell session, run: source ${PROFILE_FILE}"
echo "Or log out and log back in to apply the changes automatically."