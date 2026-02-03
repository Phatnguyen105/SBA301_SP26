package fu.se.chapter13orchid.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "category")
@EqualsAndHashCode(exclude = "category")
@Entity
@Table(name = "orchids")
public class Orchid {

    // ===== Getters & Setters =====
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String orchidName;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    private Boolean isSpecial;

    private String image;

    private Double price;

    // ===== Constructors =====
    public Orchid() {
    }

}

