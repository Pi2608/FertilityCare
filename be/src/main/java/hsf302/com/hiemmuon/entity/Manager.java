package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "managers")
public class Manager {
    @Id
    @Column(name = "manager_id")
    private int managerId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "manager_id")
    private User user;

    @Column(name = "is_active")
    private boolean isActive;

    public Manager() {
    }

    public Manager(int managerId, User user, boolean isActive) {
        this.managerId = managerId;
        this.user = user;
        this.isActive = isActive;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
