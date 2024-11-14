package org.example.Model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.example.Enum.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "customer")
public class Customer implements UserDetails {

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

    @Column(name="cpf")
    private String cpf;

    @Column(name="telefone")
    private String telefone;

    @Column(name="data_nascimento")
    private String dataNascimento;

    @Column(name="email")
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address", referencedColumnName = "endereco_id")
    private Endereco address;

    @Column(name="active")
    private boolean active;

    @Column(name="create_data")
    private Date create_data;
    
    @Column(name="last_update")
    private Date last_update;

    @Column(name="password")
    private String password;

    @Setter
    @Getter
    @Column(name = "password_code", nullable = true)
    private String recuperationCode;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_validation_code", nullable = true)
    private Date dataValidationCode;

    @Setter
    @Getter
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_send_code", nullable = true)
    private Date dataSendCode;

    @Setter
    @Getter
    @Column(name = "login_token", unique = true, nullable = true)
    private String loginToken;

    
    public UserRole role;
    

    public Customer(){}

    public Customer(String firstName, String secondName, String login, String password){
        this.first_name=firstName;
        this.last_name=secondName;
        this.email=login;
        this.password=password;
    }

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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Endereco getAddress() {
        return address;
    }
    public void setRole(UserRole role){
        this.role=role;
    }

    public void setAddress(Endereco address) {
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

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String setCode(String recuperationCode) {
        return this.recuperationCode = recuperationCode;
    }

    public Date getCodeExpiration() {
        return dataValidationCode;
    }

    public void setCodeExpiration(Date dataValidationCode) {
        this.dataValidationCode = dataValidationCode;
    }

    public void setSendCode(Date data) {
        this.dataSendCode = data;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }
    public UserRole getRole(){
        return this.role;
    }

    


}
