package org.example.Model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="customer_id")
    private Long customer_id;

    @Column(name="store_id")
    private Long store_id;
    
    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="active")
    private boolean active;

    @Column(name="create_data")
    private Date create_data;
    
    @Column(name="last_update")
    private Date last_update;

    @Column(name="password")
    private String password;
    

    


    public Long getCustomer_id() {
        return this.customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public Long getStore_id() {
        return this.store_id;
    }

    public void setStore_id(Long store_id) {
        this.store_id = store_id;
    }

    public String getFirst_name() {
        return this.first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isActive() {
        return this.active;
    }

    public boolean getActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreate_data() {
        return this.create_data;
    }

    public void setCreate_data(Date create_data) {
        this.create_data = create_data;
    }

    public Date getLast_update() {
        return this.last_update;
    }

    public void setLast_update(Date last_update) {
        this.last_update = last_update;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    

    
    
    


}
