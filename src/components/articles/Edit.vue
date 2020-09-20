<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}
                        
                        <!-- Tenants -->
                        <div class="pull-right ui-mt-15">
                            <span class="btn btn-dark btn-sm">
                                <span class="btn-icon ti-home mr-2"></span>
                                <span> {{ tenant_name }} </span>
                            </span>
                        </div>
                        <!-- End Tenants -->
                        
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize">
                                <router-link :to="{ name: refs }">{{ refs }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


            <div v-if="pgLoading" class="row h-100">
                <div class="container text-center">
                    <div class="spinner-grow mt-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

            <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

                <!-- Content -->
                <div class="tab-content">
                    <div class="row">       


                    <!-- ******* Cards ******* -->   
                    <div class="col-md-8 mb-5">

                        <!-- Card Meta -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabMeta" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Meta')"
                                            aria-expanded="false" 
                                            aria-controls="collapseMeta" 
                                            data-toggle="collapse"
                                            data-target="#collapseMeta">Meta
                                            <span id="iconToggleMeta" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseMeta" 
                                        class="collapse show" 
                                        aria-labelledby="TabMeta" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputMeta1">Meta title</label>
                                            <input class="form-control"
                                                    id="inputMeta1"  
                                                    type="text" 
                                                    v-model="row.meta_title">
                                        </div>
                                        <!-- End Meta title -->
                                            
                                        <!-- Meta keywords -->
                                        <div class="form-group">
                                            <div class="pull-right f12"
                                                v-if="row.meta_keywords" 
                                                v-text="(row.meta_keywords.length)">
                                            </div>
                                            <label for="inputMeta2">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputMeta2" 
                                                    rows="5"  
                                                    v-model="row.meta_keywords">
                                            </textarea>
                                        </div>
                                        <!-- End Meta keywords -->

                                        <!-- Meta description -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_description" 
                                                v-text="(row.meta_description.length)">
                                            </div>
                                            <label for="inputMeta3">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputMeta3" 
                                                    rows="5" 
                                                    v-model="row.meta_description">
                                            </textarea>
                                        </div>
                                        <!-- End Meta description -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Meta -->


                        <!-- Card Article -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabArticle" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Article')"
                                            aria-expanded="false" 
                                            aria-controls="collapseArticle" 
                                            data-toggle="collapse"
                                            data-target="#collapseArticle">Article
                                            <span id="iconToggleArticle" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseArticle" 
                                        class="collapse" 
                                        aria-labelledby="TabArticle" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">
                                        
                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputRow1">Title</label>
                                            <input class="form-control" 
                                                    id="inputRow1" 
                                                    type="text" 
                                                    v-model="row.title" 
                                                    @keyup="onTitleChange">
                                        </div>
                                        <!-- End Title -->

                                        <!-- Slug -->
                                        <div class="form-group">
                                            <label for="inputRow2">Slug</label>
                                            <input class="form-control text-lowercase"
                                                    id="inputRow2"  
                                                    type="text" 
                                                    v-model="row.slug" 
                                                    @keydown.space.prevent 
                                                    @paste="onSlugPaste"
                                                    @change="onSlugChange(false)">
                                        </div>
                                        <!-- End Slug -->

                                        <!-- Sorr -->
                                        <div class="form-group">
                                            <label for="inputRow3">Sort</label>
                                            <input class="form-control"
                                                    id="inputRow3"  
                                                    type="number" 
                                                    min="0"
                                                    v-model.number="row.sort">
                                        </div>
                                        <!-- End Sort -->

                                        <!-- Short Body -->
                                        <div class="form-group">
                                            <label for="inputEditor1">Short body</label>
                                            <editor
                                                id="inputEditor1"
                                                v-model="row.short_body"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 300,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Short Body -->

                                        <!-- Body -->
                                        <div class="form-group">
                                            <label for="inputEditor2">Body</label>
                                            <editor
                                                id="inputEditor2"
                                                v-model="row.body"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 600,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Body -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Article -->


                        <!-- Card Items -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabItems" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Items')"
                                            aria-expanded="false" 
                                            aria-controls="collapseItems" 
                                            data-toggle="collapse"
                                            data-target="#collapseItems">Items
                                            <span id="iconToggleItems" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseItems" 
                                        class="collapse" 
                                        aria-labelledby="TabItems" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                
                                <!-- For Loop -->
                                <div v-for="i in row.item_key" 
                                    :key="i" 
                                    :class="(i == 0) ? 'hidden' : '' " 
                                    :id="'frm_'+i"
                                    class="ui-for-div">

                                    <!-- Remove -->
                                    <div class="pull-right ui-mt-10">
                                        <button v-if="i != 0"
                                            type="button" 
                                            class="btn btn-danger btn-circle btn-with-icon btn-sm" 
                                            @click="removeOption(i)">
                                            <span class="btn-icon ti-close font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End Remove -->

                                    <!-- Title -->
                                    <div class="form-group">
                                        <label :for="'input1'+i">Link</label>
                                        <input class="form-control" 
                                                :id="'input1'+i" 
                                                type="text" 
                                                v-model="row.items_link[i]">
                                    </div>
                                    <!-- End Title -->

                                     <!-- Title -->
                                    <div class="form-group">
                                        <label :for="'input2'+i">Sort</label>
                                        <input class="form-control" 
                                                :id="'input2'+i" 
                                                type="text" 
                                                v-model="row.items_sort[i]">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label :for="'ieditor3'+i">Body</label>
                                        <editor
                                            :id="'ieditor3'+i"
                                            v-model="row.items_body[i]"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Short Body -->

                                    <!-- image alt -->
                                    <div class="form-group">
                                        <label :for="'input4'+i">Image alt</label>
                                        <input class="form-control" 
                                                :id="'input4'+i" 
                                                type="text" 
                                                v-model="row.items_image_alt[i]">
                                    </div>
                                    <!-- End image alt -->

                                    <!-- image title -->
                                    <div class="form-group">
                                        <label :for="'input5'+i">Image title</label>
                                        <input class="form-control" 
                                                :id="'input5'+i" 
                                                type="text" 
                                                v-model="row.items_image_title[i]">
                                    </div>
                                    <!-- End image title -->

                                    <!-- image -->
                                    <div class="form-group">
                                        <label :for="'input6'+i">Image</label>
                                        <p><img v-if="row.items_preview[i]" 
                                            :src="row.items_preview[i]"
                                            class="custom-image">
                                        </p>
                                        <input class="form-control" 
                                                :id="'input6'+i" 
                                                type="file"
                                                ref="myDropify" 
                                                v-on:change="onItemsImageChange($event, i)">
                                    </div>
                                    <!-- End image -->

                                </div>
                                <!-- End Loop -->

                                    <!-- Add more -->
                                    <div class="row pull-right">
                                        <button type="button" 
                                            class="btn btn-dark btn-circle btn-with-icon"
                                            @click="opnFrm()">
                                            <span class="btn-icon ti-plus font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End more -->

                                    
                                </div>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- End Card Items -->

                    </div>
                    <!-- ******* End Cards ******* -->   




                    <!-- ******* Navbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- Nav Writer -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavWriter" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Writer')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavWriter" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavWriter">Writer
                                            <span id="iconToggleWriter" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavWriter" 
                                        class="collapse" 
                                        aria-labelledby="NavWriter" 
                                        data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <!-- Writer -->
                                        <div class="form-group">
                                            <div v-if="writerLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                    v-if="!writerLoading" 
                                                    v-model="row.writer_id">
                                                    <option value="">Select Writer</option>
                                                    <option v-for="(writer, index) in writers" 
                                                            :key="index"
                                                            :value="writer.id">
                                                            {{ writer.title }}
                                                    </option>
                                            </select>
                                        </div>
                                        <!-- End Writer -->
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Writer -->


                        <!-- Nav Destination -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavDestination" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Destination')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavDestination" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavDestination">Destination
                                            <span id="iconToggleDestination" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavDestination" 
                                        class="collapse" 
                                        aria-labelledby="NavDestination" 
                                        data-parent="#accordionNav">
                                        
                                    <div class="col-12 pt-3">
                                        <!-- Destinations -->
                                        <div class="form-group">
                                            <div v-if="destinationLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                    v-if="!destinationLoading" 
                                                    v-model="row.destination_id">
                                                    <option value="">Select Destination</option>
                                                    <optgroup v-for="(region, index) in destinations" 
                                                            :key="index"
                                                            :label="region.title">
                                                        <option v-for="(destination,idx) in region.destinations"
                                                            :key="idx"
                                                            :value="destination.id">
                                                            {{ destination.title }}
                                                        </option>
                                                    </optgroup>
                                            </select>
                                        </div>
                                        <!-- End Destination -->
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Destination -->


                        <!-- Nav Category -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavCategory" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Category')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavCategory" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavCategory">Category
                                            <span id="iconToggleCategory" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavCategory" 
                                        class="collapse" 
                                        aria-labelledby="NavCategory" 
                                        data-parent="#accordionNav">
                                        
                                    <div class="col-12 pt-3">
                                        <!-- Category -->
                                        <div class="form-group">
                                            <div v-if="categoryLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                    v-if="!categoryLoading" 
                                                    v-model="row.category_id">
                                                    <option value="">Select Category</option>
                                                    <option v-for="(category, index) in categories" 
                                                            :key="index"
                                                            :value="category.id">
                                                            {{ category.title }}
                                                    </option>
                                            </select>
                                        </div>
                                        <!-- End Category -->
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Category -->


                        <!-- Nav Multiple Packages -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavPackages" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Packages')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavPackages" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavPackages">Multiple Related Packages
                                            <span id="iconTogglePackages" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavPackages" 
                                        class="collapse" 
                                        aria-labelledby="NavPackages" 
                                        data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="packageLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!packageLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.packagesValues" 
                                                    :options="packagesOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search packages"
                                                    :preselect-first="true">
                                            </multiselect>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Multiple Packages -->


                        <!-- Nav Multiple Tags -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavMultipleTags" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('MultipleTags')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavMultipleTags" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavMultipleTags">Multiple Tags
                                            <span id="iconToggleMultipleTags" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavMultipleTags" 
                                        class="collapse" 
                                        aria-labelledby="NavMultipleTags" 
                                        data-parent="#accordionNav">
                                        
                                        <div class="col-12 pt-3">
                                            <div class="form-group">
                                                <div v-if="tagsLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!tagsLoading"
                                                        id="multiselect"
                                                        ref="multiselectRef"
                                                        autocomplete="on"
                                                        v-model="row.tagsValues" 
                                                        :options="tagsOptions" 
                                                        :multiple="true"
                                                        :close-on-select="false" 
                                                        :clear-on-select="false" 
                                                        :hide-selected="true" 
                                                        :preserve-search="true" 
                                                        :taggable="false"
                                                        placeholder="Type to search tags"
                                                        :preselect-first="false">
                                                </multiselect>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Multiple Tags -->

                        <!-- Nav Image -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavImage" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Image')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavImage" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavImage">Featued Image
                                            <span id="iconToggleImage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavImage" 
                                        class="collapse" 
                                        aria-labelledby="NavImage" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Image -->
                                            <div class="form-group">
                                                <label>Image</label>
                                                <img :src="row.preview" 
                                                    class="mb-2 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onImageChange"
                                                    accept="image/*">
                                            </div>
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                            </div>
                                            <!-- Image -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Image -->


                        <!-- Nav Status -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavStatus" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Status')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavStatus" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavStatus">Status & Visibility
                                            <span id="iconToggleStatus" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavStatus" 
                                        class="collapse" 
                                        aria-labelledby="NavStatus" 
                                        data-parent="#accordionNav">
                                        
                                        <div class="col-12 pt-3">
                                            <!-- Status -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch1" 
                                                        :checked="row.status"
                                                        @click="onStatus">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch1"
                                                        v-html="(row.status) ? 'Active' : 'Inactive'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Status -->

                                            <!-- Featured -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.featured"
                                                        @click="onFeatured">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.featured) 
                                                            ? 'Featured Article' : 'Normal Article'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Featured -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Status -->

                    </div>
                    <!-- ******* End Navbar ******** -->

                </div>
            </div>
            <!-- End Content -->

                    <!-- Button -->
                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading" class="text-capitalize"> Update {{ refs }}</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-danger" 
                                :disabled="btnLoading" 
                                @click="cancel">
                                <span class="ti-close"></span>
                                <span> Cancel </span>
                            </button>
                        </div>
                    </div>
                    <!-- End Button -->


                </form>
            </div>


                <Footer></Footer>
            </div>
        </main>
        <!-- End Main -->
        
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import Editor from '@tinymce/tinymce-vue';
    import Multiselect from 'vue-multiselect';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Footer,
            Editor,
            Multiselect
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    // meta
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    // row
                    title: '',
                    slug: '',
                    sort: 0,
                    short_body: '',
                    body: '',

                    // items
                    item_key: 0,
                    items: [],
                    items_link: [],
                    items_sort: [],
                    items_body: [],

                    items_preview: [],
                    items_image_base64: [],
                    items_image_alt: [],
                    items_image_title: [],

                    // navbar
                    writer_id: '',
                    destination_id: '',
                    category_id: '',
                    tagsValues: [],
                    packagesValues: [],

                    // image
                    preview: '',
                    image_base64: '',
                    image_alt: '',
                    image_title: '',

                    // status & visibility
                    status: 1,
                    featured: 0,
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },
                // writer
                writers: [],
                writerLoading: true,

                // destination
                destinations: [],
                destinationLoading: true,

                // category
                categories: [],
                categoryLoading: true,

                // multiple tags
                tagsOptions: [],
                tagsLoading: true,

                // multiple packages
                packagesOptions: [],
                packageLoading: true,

                pgLoading: true,
                btnLoading: false,

                tenant_id: 0,
                tenant_name: '',
                refs: 'articles'
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }   

            // Tenants
            if(localStorage.getItem('tenant_id')) {
                this.tenant_id = localStorage.getItem('tenant_id');
            }
            if(localStorage.getItem('tenant_name')) {
                this.tenant_name = localStorage.getItem('tenant_name');
            }

            this.fetchRow();
        },
        methods: {
            
            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    // meta
                    this.row.meta_title = (res.data.row.meta) ? res.data.row.meta.meta_title : null;
                    this.row.meta_keywords = (res.data.row.meta) ? res.data.row.meta.meta_keywords : null;
                    this.row.meta_description = (res.data.row.meta) ? res.data.row.meta.meta_description : null;

                    // row
                    this.row.title = res.data.row.title;
                    this.row.slug = res.data.row.slug;
                    this.row.sort = res.data.row.sort;
                    this.row.short_body = res.data.row.short_body;
                    this.row.body = res.data.row.body;

                    // items
                    this.row.item_key = res.data.row.items.length;
                    if(res.data.row.items) {
                        for(let i = 1; i <= this.row.item_key; i++) {
                            let x = i-1;
                            this.row.items_link[i] = (res.data.row.items[x].link) 
                                                        ? res.data.row.items[x].link
                                                        : '';
                            this.row.items_sort[i] = (res.data.row.items[x].sort)
                                                        ? res.data.row.items[x].sort
                                                        : 0;
                            this.row.items_body[i] = (res.data.row.items[x].body)
                                                        ? res.data.row.items[x].body
                                                        : '';
                            
                            // image
                            this.row.items_preview[i] = (res.data.row.items[x].image) 
                                                        ? res.data.row.items[x].image.image_url
                                                        : '';
                            this.row.items_image_base64[i] = (res.data.row.items[x].image) 
                                                            ? res.data.row.items[x].image.image_url
                                                            : '';
                            this.row.items_image_alt[i] = (res.data.row.items[x].image) 
                                                            ? res.data.row.items[x].image.image_alt
                                                            : '';
                            this.row.items_image_title[i] = (res.data.row.items[x].image) 
                                                            ? res.data.row.items[x].image.image_title
                                                            : '';
                        }
                    }

                    // navbar
                    this.row.writer_id = (res.data.row.writer) ? res.data.row.writer.id : null;
                    this.row.destination_id = (res.data.row.destination) ? res.data.row.destination.id : null;
                    this.row.category_id = (res.data.row.category) ? res.data.row.category.id : null;
                    this.row.tagsValues = (res.data.row.tagsValues) ? res.data.row.tagsValues : [];
                    this.row.packagesValues = (res.data.row.packagesValues) ? res.data.row.packagesValues : [];

                    // image
                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_base64 = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.image_title : null;

                    // status & visibility
                    this.row.status = res.data.row.status;
                    this.row.featured = res.data.row.featured;

                    this.fetchWriters(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // fetch Writer
            fetchWriters(){
                this.writerLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/writers',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.writerLoading = false;
                        this.writers = res.data.rows;
                        this.fetchDestinations(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // fetch Destination
            fetchDestinations(){
                this.destinationLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/regions',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.destinationLoading = false;
                        this.destinations = res.data.rows;
                        this.fetchCategories(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Categories
            fetchCategories(){
                this.categoryLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/categories',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.categoryLoading = false;
                        this.categories = res.data.rows;
                        this.fetchTags(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // fetchMultipleTags
            fetchTags(){
                this.tagsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/tags',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.tagsLoading = false;
                    this.tagsOptions = res.data.tags;
                    this.fetchPackages(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // Packages
            fetchPackages(){
                this.packageLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packages',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.packageLoading = false;
                        this.packagesOptions = res.data.packages;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // edit Row
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                // items
                for( let i = 1; i <= this.row.item_key; i++ ) {
                    this.row.items[i] = {
                        // item
                        'link' : this.row.items_link[i],
                        'body' : this.row.items_body[i],
                        'sort' : this.row.items_sort[i],
                        // image
                        'image_base64' : this.row.items_image_base64[i],
                        'image_alt' : this.row.items_image_alt[i],
                        'image_title' : this.row.items_image_title[i]
                    }
                }
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        tenant_id: this.tenant_id,
                        // meta
                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description,

                        // row
                        title: this.row.title,
                        slug: this.row.slug,
                        sort: this.row.sort,
                        short_body: this.row.short_body,
                        body: this.row.body,

                        // items
                        items: this.row.items,

                        // navbar
                        writer_id: this.row.writer_id,
                        destination_id: this.row.destination_id,
                        category_id: this.row.category_id,
                        tags: this.row.tagsValues,
                        packages: this.row.packagesValue,

                        // image
                        image_base64: this.row.image_base64,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        // status & visibility
                        featured: this.row.featured,
                        status: this.row.status,
                    }
                }
                this.axios(options)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: this.refs })
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 403) {
                            this.removeLocalStorage();
                            this.$router.push({ name: 'forbidden' });
                        } else {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: err.response.data.message
                            });
                        }
                    })
                    .finally(() => {})
            },

            // Title
            onTitleChange() {
                this.onSlugChange(this.row.title);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str){
                if(!str) {
                   let str = this.row.slug;
                   this.row.slug = str.replace(/\s+/g, '-');
                } else {
                    this.row.slug = str.replace(/\s+/g, '-');
                }
            },


            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.createBase64Image(file);
            },
            createBase64Image(fileObject){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.image_base64 = e.target.result;
                };
            },

            onItemsImageChange(e, i) {
                const file = e.target.files[0];
                this.row.items_preview[i] = URL.createObjectURL(file);
                this.createItemsBase64Image(file, i);
            },
            createItemsBase64Image(fileObject, i){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.items_image_base64[i] = e.target.result;
                };
            },

            // items add more
            opnFrm() {
                this.row.item_key++;
            },
            removeOption(i) {
                document.querySelector('#frm_'+i).remove();
                this.row.items_link[i] = '';
                this.row.items_sort[i] = '';
                this.row.items_body[i] = '';
                this.row.items_preview[i] = '';
                this.row.items_image_base64[i] = '';
                this.row.items_image_alt[i] = '';
                this.row.items_image_title[i] = '';
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
            onFeatured(){
                if(this.row.featured)
                    this.row.featured = 0;
                else
                    this.row.featured = 1;
            },

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                localStorage.removeItem('tenant_id');
            },

            // toggleCollapse
            collapseToggle(div) {
                let el = document.querySelector("span#iconToggle"+div);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: this.refs });
                }
            },

        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
