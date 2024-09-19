<!-- Admin Dashboard Role-Specific Content -->

<div id="admin-controls" class="hidden"> <!-- Only visible to Admins -->
    <h3 class="text-2xl font-bold text-white mt-8">Admin Controls</h3>
    <button class="neumorphic-button" onclick="loadUsers()">Assign Roles</button>
    <div id="user-list" class="space-y-4 mt-4"></div>
</div>

<div id="creator-controls" class="hidden"> <!-- Only visible to Creators and Admins -->
    <h3 class="text-2xl font-bold text-white mt-8">Content Submission</h3>
    <p class="text-white">As a creator, you can submit products for review by the admin.</p>
    <button class="neumorphic-button">Submit Content</button>
</div>

<script>
    // Check user role and display relevant content
    function checkUserRole() {
        fetch('/current-user-role') // Assuming we have an endpoint to get the current user's role
            .then(response => response.json())
            .then(user => {
                if (user.role === 'admin') {
                    document.getElementById('admin-controls').classList.remove('hidden');
                }
                if (user.role === 'creator' || user.role === 'admin') {
                    document.getElementById('creator-controls').classList.remove('hidden');
                }
            });
    }

    // Load users for role assignment (Admin only)
    function loadUsers() {
        fetch('/users') // Endpoint to get all users
            .then(response => response.json())
            .then(users => {
                const userList = document.getElementById('user-list');
                userList.innerHTML = ''; // Clear previous list

                users.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.classList.add('product-card');
                    userCard.innerHTML = `
                        <p class="text-lg">${user.email}</p>
                        <select id="role-${user._id}">
                            <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                            <option value="creator" ${user.role === 'creator' ? 'selected' : ''}>Creator</option>
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                        </select>
                        <button class="neumorphic-button" onclick="assignRole('${user._id}')">Assign Role</button>
                    `;
                    userList.appendChild(userCard);
                });
            });
    }

    // Assign role to a user
    function assignRole(userId) {
        const role = document.getElementById(`role-${userId}`).value;

        fetch(`/assign-role/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role })
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
            });
    }

    // Check user role on page load
    checkUserRole();
</script>
